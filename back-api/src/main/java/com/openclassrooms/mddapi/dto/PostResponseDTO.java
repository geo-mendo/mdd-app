package com.openclassrooms.mddapi.dto;

import com.openclassrooms.mddapi.models.CommentEntity;
import com.openclassrooms.mddapi.models.TopicEntity;
import com.openclassrooms.mddapi.models.UserEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PostResponseDTO {
    Long id;
    String title ;
    String content;
    UserResponseDTO author;
    TopicEntity topic;
    List<CommentEntity> comments;
    LocalDate createdAt;
}
