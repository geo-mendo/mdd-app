package com.openclassrooms.mddapi.services;

import com.openclassrooms.mddapi.dto.CommentResponseDTO;
import com.openclassrooms.mddapi.models.CommentEntity;
import com.openclassrooms.mddapi.repositories.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CommentService {
    @Autowired
    private CommentRepository commentRepository;

    public CommentResponseDTO createComment(CommentEntity message){

        CommentEntity commentCreated = commentRepository.save(message);

        return new CommentResponseDTO(commentCreated.getContent(),commentCreated.getUser());
    }
}
