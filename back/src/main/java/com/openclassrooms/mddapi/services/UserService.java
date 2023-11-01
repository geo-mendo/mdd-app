package com.openclassrooms.mddapi.services;


import com.openclassrooms.mddapi.dto.SubscriptionRequestDTO;
import com.openclassrooms.mddapi.dto.UserResponseDTO;
import com.openclassrooms.mddapi.models.TopicEntity;
import com.openclassrooms.mddapi.models.UserEntity;
import com.openclassrooms.mddapi.repositories.TopicRepository;
import com.openclassrooms.mddapi.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    UserRepository userRepository;
    @Autowired
    TopicRepository topicRepository;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        UserEntity user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found with email: " + email));

        return new UserEntity(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getPassword(),
                user.getSubscriptions(),
                user.getCreatedAt(),
                user.getUpdatedAt());
    }

    public UserEntity getUserById(Long id) {
        return userRepository
                .findById(Math.toIntExact(id))
                .orElseThrow();
    }

    public UserEntity getUserByEmail(String email) {
        return userRepository
                .findByEmail(email)
                .orElseThrow();
    }

    public UserEntity createNewUser(UserEntity newUser) {
        newUser.setCreatedAt(LocalDate.now());
        return userRepository
                .save(newUser);
    }

    public void addSubscription(SubscriptionRequestDTO request) {
        UserEntity user = userRepository.findById(Math.toIntExact(request.getUserId())).orElseThrow();
        TopicEntity topic = topicRepository.findById(request.getTopicId()).orElseThrow();

        user.getSubscriptions().add(topic); // Ajoute le topic à la liste des souscriptions de l'utilisateur
        userRepository.save(user); // Sauvegarde l'utilisateur avec ses nouvelles souscriptions
    }

    public UserResponseDTO mapUserEntityToDTO(UserEntity user){
        return new UserResponseDTO(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getCreatedAt(),
                user.getUpdatedAt()
        );
    }
}
