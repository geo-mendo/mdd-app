package com.openclassrooms.mddapi.controllers;

import com.openclassrooms.mddapi.dto.PostRequestDTO;
import com.openclassrooms.mddapi.dto.PostResponseDTO;
import com.openclassrooms.mddapi.dto.PostsResponseDTO;
import com.openclassrooms.mddapi.dto.UserResponseDTO;
import com.openclassrooms.mddapi.services.AuthService;
import com.openclassrooms.mddapi.services.PostService;
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

@RestController
@RequestMapping(value = "/api/posts")
@RequiredArgsConstructor
public class PostController {


    private final PostService postService;

    private final AuthService authService;


    @Operation(summary = "Récupérer tous les articles",security = @SecurityRequirement(name = "bearerAuth"))
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Retourne la liste de tout les articles",
                    content = { @Content(mediaType = "application/json",
                            schema = @Schema(implementation = PostsResponseDTO.class)) }),
            @ApiResponse(responseCode = "500", description = "Erreur interne du serveur") })
    @GetMapping
    public ResponseEntity<PostsResponseDTO> getAllPosts() {
        return ResponseEntity.ok(postService.getAllPosts());
    }

    @Operation(summary = "Récupérer un article par son ID",security = @SecurityRequirement(name = "bearerAuth"))
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Retourne l'article demandé",
                    content = { @Content(mediaType = "application/json",
                            schema = @Schema(implementation = PostResponseDTO.class)) }),
            @ApiResponse(responseCode = "404", description = "article non trouvé"),
            @ApiResponse(responseCode = "500", description = "Erreur interne du serveur") })
    @GetMapping("/{id}")
    public ResponseEntity<PostResponseDTO> getOnePostById(
            @Parameter(description="ID de l'article à récupérer", required=true)
            @PathVariable Long id) {
        return ResponseEntity.ok(postService.mapPostEntityToDTO(postService.getPostById(id)));
    }

    @Operation(summary = "Ajouter un nouvel article",security = @SecurityRequirement(name = "bearerAuth"))
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Retourne l'article crée",
                    content = { @Content(mediaType = "application/json",
                            schema = @Schema(implementation = PostResponseDTO.class)) }),
            @ApiResponse(responseCode = "400", description = "Mauvaise requête - les informations fournies sont invalides"),
            @ApiResponse(responseCode = "500", description = "Erreur interne du serveur") })
    @PostMapping()
    public ResponseEntity<PostResponseDTO> addNewPost(
            @Parameter(description="Requête contenant les informations de l'article à créer", required=true)
            @RequestBody() PostRequestDTO postRequestDTO,
            HttpServletRequest request
            ) throws IOException, ServletException {

            UserResponseDTO currentUser = authService.getCurrentUser(request);
            postRequestDTO.setUserId(currentUser.getId());
            return ResponseEntity.ok(postService.addNewRental(postRequestDTO));

    }

}
