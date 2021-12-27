import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/Post';
import { PostService } from '../../services/post.service';
import { AppComponent } from '../../app.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../models/User';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public listOfPost: Post[];
  
  commentToPost: string;
  postForm: FormGroup;
  hasItems: boolean;
  logged: boolean;
  profile: User;  

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    public postService: PostService,
    public userService: UserService,
    private formbuilder: FormBuilder,
    public appComponent: AppComponent
  ) {
    this.postForm = this.formbuilder.group({
      title: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(5)]],
      content: ['', [Validators.required, Validators.maxLength(200), Validators.minLength(5)]]
    })
  }

  ngOnInit(): void {
    if(!this.appComponent.IsLogged) {
      this.router.navigate(["home"])
    }

    this.logged = this.appComponent.ValidateAuthenticate();
    const userId = this.route.snapshot.paramMap.get('idUser');

    if(userId != null) {
      this.getProfileInfo(userId);
    }

    this.getPosts(userId);
  }

  createPost() {
    const post: Post = {
      content: this.postForm.get('content').value,
      title: this.postForm.get('title').value,
      userId: this.appComponent.getUserId()
    }

    this.postService.createPost(post).subscribe(data => {
      this.listOfPost.unshift(data);
      this.listOfPost.sort();
      this.toastr.success("Post creado", "Gracias");
    });

    this.postForm.reset();
  }

  getPosts(userId?: string){
    this.postService.getPosts(userId).subscribe((res: Post[]) => {
      this.listOfPost = res;
    })
  }

  getProfileInfo(userId?: string){
    this.userService.getInfoUser(userId).subscribe((res: User) => {
      this.profile = res;
    })
  }
}