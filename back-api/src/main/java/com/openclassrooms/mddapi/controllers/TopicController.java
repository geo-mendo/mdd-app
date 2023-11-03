package com.openclassrooms.mddapi.controllers;

import com.openclassrooms.mddapi.dto.*;
import com.openclassrooms.mddapi.services.AuthService;
import com.openclassrooms.mddapi.services.TopicService;
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
import java.util.List;

@RestController
@RequestMapping(value = "/api/topics")
@RequiredArgsConstructor
public class TopicController {


    private final TopicService topicService;

    private final AuthService authService;


    @Operation(summary = "Récupérer tous les thèmes",security = @SecurityRequirement(name = "bearerAuth"))
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Retourne la liste de tout les thèmes",
                    content = { @Content(mediaType = "application/json" ) }),
            @ApiResponse(responseCode = "500", description = "Erreur interne du serveur") })
    @GetMapping
    public ResponseEntity<List<TopicResponseDTO>> getAllTopics() {
        return ResponseEntity.ok(topicService.getAllTopics());
    }


    @Operation(summary = "Ajouter un nouveau thème",security = @SecurityRequirement(name = "bearerAuth"))
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Retourne le thème crée",
                    content = { @Content(mediaType = "application/json",
                            schema = @Schema(implementation = TopicResponseDTO.class)) }),
            @ApiResponse(responseCode = "400", description = "Mauvaise requête - les informations fournies sont invalides"),
            @ApiResponse(responseCode = "500", description = "Erreur interne du serveur") })
    @PostMapping()
    public ResponseEntity<TopicResponseDTO> addNewTopic(
            @Parameter(description="Requête contenant les informations du thème à créer", required=true)
            @RequestBody() TopicRequestDTO topicRequestDTO,
            HttpServletRequest request
            ) throws IOException, ServletException {
            System.out.println(topicRequestDTO);
            return ResponseEntity.ok(topicService.addNewTopic(topicRequestDTO));

    }

}
