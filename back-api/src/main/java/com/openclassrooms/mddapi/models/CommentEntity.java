package com.openclassrooms.mddapi.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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
        @JsonIgnoreProperties(value = {"subscriptions", "password"})
        private UserEntity user;
        @ManyToOne
        @JoinColumn(name = "post_id")
        @JsonIgnore
        private PostEntity post;
        @Column(name = "created_at")
        private LocalDate createdAt;
}
