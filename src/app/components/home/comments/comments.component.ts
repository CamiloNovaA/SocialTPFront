import { Component, OnInit, Input } from '@angular/core';
import { Post } from 'src/app/models/Post';
import { Comment } from 'src/app/models/Comment';
import { CommentsService } from '../../../services/comments.service';
import { AppComponent } from '../../../app.component';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  @Input() post: Post;
  @Input() logged: boolean;

  public listOfComments: Comment[];

  commentForm: FormGroup;

  constructor(
    public commentsService: CommentsService,
    private appComponent: AppComponent,
    private formbuilder: FormBuilder,
    private toastr: ToastrService
  ) {
    this.commentForm = this.formbuilder.group({
      content: ['', [Validators.required, Validators.maxLength(200), Validators.minLength(5)]]
    })
  }

  ngOnInit(): void {
    this.getCommentsByPost(this.post.idPost);
  }

  public getCommentsByPost(idpost: number){
    this.commentsService.getCommentByPost(idpost).subscribe((res: Comment[]) => {
      this.listOfComments = res;
    })
  }

  addComment(idPost: number) {
    var postId = <HTMLInputElement>document.getElementById('comment' + idPost);
    
    const comment: Comment = {
      content: this.commentForm.get("content").value,
      idPost: idPost,
      idUser: this.appComponent.getUserId(),
      userName: this.appComponent.getUserName()
    }

    this.commentsService.addComent(comment).subscribe(data => {
      this.listOfComments.push(comment);
      this.toastr.success("Comentario enviado", 'Bien hecho');
      this.commentForm.reset();
    });
  }
}