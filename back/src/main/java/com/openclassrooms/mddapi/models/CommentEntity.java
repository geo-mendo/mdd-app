package com.openclassrooms.mddapi.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "comments")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CommentEntity {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;
        private String content;
        @ManyToOne
        @JoinColumn(name = "user_id")
        private UserEntity user;
        @ManyToOne
        @JoinColumn(name = "post_id")
        private PostEntity post;
        @Column(name = "createdAt")
        private LocalDate createdAt;
}
