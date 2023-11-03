package com.openclassrooms.mddapi.controllers;

import com.openclassrooms.mddapi.dto.PostResponseDTO;
import com.openclassrooms.mddapi.dto.SubscriptionRequestDTO;
import com.openclassrooms.mddapi.dto.UpdateUserRequestDTO;
import com.openclassrooms.mddapi.dto.UserResponseDTO;
import com.openclassrooms.mddapi.models.UserEntity;
import com.openclassrooms.mddapi.services.AuthService;
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

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class UserController {


    private final UserService userService;
    private final AuthService authService;


    @Operation(
            summary = "Récupérer un utilisateur spécifique par son ID",
            security = @SecurityRequirement(name = "bearerAuth")
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Retourne l'utilisateur demandé",
                    content = { @Content(mediaType = "application/json",
                            schema = @Schema(implementation = UserResponseDTO.class)) }),
            @ApiResponse(responseCode = "404", description = "Utilisateur non trouvé"),
            @ApiResponse(responseCode = "500", description = "Erreur interne du serveur") })
    @GetMapping("/user/{id}")
    public ResponseEntity<UserResponseDTO> getUserById(
            @Parameter(description="ID de l'utilisateur à récupérer", required=true)
            @PathVariable Long id) {
        return ResponseEntity.ok(userService.mapUserEntityToDTO(userService.getUserById(id)));
    }

    @Operation(summary = "Mettre à jour les info de profil",security = @SecurityRequirement(name = "bearerAuth"))
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Retourne le profil mis à jour",
                    content = { @Content(mediaType = "application/json",
                            schema = @Schema(implementation = UpdateUserRequestDTO.class)) }),
            @ApiResponse(responseCode = "400", description = "Mauvaise requête - les informations fournies sont invalides"),
            @ApiResponse(responseCode = "500", description = "Erreur interne du serveur") })
    @PutMapping("/update-profile/{id}")
    public ResponseEntity<UserEntity> updateProfile(@RequestBody UpdateUserRequestDTO request, @PathVariable Long id) {

        return ResponseEntity.ok(userService.updateUser(request, id));
    }

    @Operation(summary = "Ajouter un nouvel abonnement",security = @SecurityRequirement(name = "bearerAuth"))
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Retourne l'abonnement crée",
                    content = { @Content(mediaType = "application/json",
                            schema = @Schema(implementation = SubscriptionRequestDTO.class)) }),
            @ApiResponse(responseCode = "400", description = "Mauvaise requête - les informations fournies sont invalides"),
            @ApiResponse(responseCode = "500", description = "Erreur interne du serveur") })
    @PostMapping("/add-subscription")
    public ResponseEntity<?> addSubscription(@RequestBody SubscriptionRequestDTO request) {
        userService.addSubscription(request);
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "Supprimer abonnement",security = @SecurityRequirement(name = "bearerAuth"))
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Retourne ok",
                    content = { @Content(mediaType = "application/json") }),
            @ApiResponse(responseCode = "400", description = "Mauvaise requête - les informations fournies sont invalides"),
            @ApiResponse(responseCode = "500", description = "Erreur interne du serveur") })
    @DeleteMapping("/remove-subscription/{id}")
    public ResponseEntity<?> removeSubscription(HttpServletRequest request, @PathVariable Long id) throws ServletException {
        UserEntity user = this.authService.getUserFromToken(request);
        userService.removeSubscription(user, id);
        return ResponseEntity.ok().build();
    }


}
