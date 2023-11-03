package com.openclassrooms.mddapi.controllers;

import com.openclassrooms.mddapi.dto.CommentRequestDTO;
import com.openclassrooms.mddapi.dto.CommentResponseDTO;
import com.openclassrooms.mddapi.dto.UserResponseDTO;
import com.openclassrooms.mddapi.models.CommentEntity;
import com.openclassrooms.mddapi.models.PostEntity;
import com.openclassrooms.mddapi.models.UserEntity;
import com.openclassrooms.mddapi.services.AuthService;
import com.openclassrooms.mddapi.services.CommentService;
import com.openclassrooms.mddapi.services.PostService;
import com.openclassrooms.mddapi.services.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.time.LocalDate;

@RestController
@RequestMapping( "/api/comments")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    private final PostService postService;

    private final AuthService authService;

    private final UserService userService;


    @Operation(summary = "Ajouter un nouveau commentaire",security = @SecurityRequirement(name = "bearerAuth"))
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Retourne le commentaire créé",
                    content = { @Content(mediaType = "application/json",
                            schema = @Schema(implementation = CommentResponseDTO.class)) }),
            @ApiResponse(responseCode = "400", description = "Mauvaise requête - les informations fournies sont invalides"),
            @ApiResponse(responseCode = "500", description = "Erreur interne du serveur") })
    @PostMapping()
    public ResponseEntity<CommentResponseDTO> addNewMessage(
            @Parameter(description="Requête contenant les informations du commentaire à créer", required=true)
            @RequestBody CommentRequestDTO newCommentDTO,
            HttpServletRequest request) throws IOException, ServletException {
        UserEntity user =  authService.getUserFromToken(request);
        PostEntity post = postService.getPostById(newCommentDTO.getPostId());
        CommentEntity newMessage = new CommentEntity();
        newMessage.setContent(newCommentDTO.getContent());
        newMessage.setUser(user);
        newMessage.setPost(post);
        newMessage.setCreatedAt(LocalDate.now());
        return ResponseEntity.ok(commentService.createComment(newMessage));
    }
}
