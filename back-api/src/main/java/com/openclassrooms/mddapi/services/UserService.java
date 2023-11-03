package com.openclassrooms.mddapi.services;


import com.openclassrooms.mddapi.dto.SubscriptionRequestDTO;
import com.openclassrooms.mddapi.dto.UpdateUserRequestDTO;
import com.openclassrooms.mddapi.dto.UserResponseDTO;
import com.openclassrooms.mddapi.models.TopicEntity;
import com.openclassrooms.mddapi.models.UserEntity;
import com.openclassrooms.mddapi.repositories.TopicRepository;
import com.openclassrooms.mddapi.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.webjars.NotFoundException;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService {

    @Autowired
    UserRepository userRepository;
    @Autowired
    TopicRepository topicRepository;

    private final PasswordEncoder passwordEncoder;


    @Override
    @Transactional
    public UserDetails loadUserByUsername(String emailOrUsername) throws UsernameNotFoundException {
        UserEntity user = userRepository.findByEmail(emailOrUsername)
                .orElse(null);

        if (user == null) {
            user = userRepository.findByUsername(emailOrUsername)
                    .orElseThrow(() -> new UsernameNotFoundException("Utilisateur non trouvé avec l'email ou le nom d'utilisateur : " + emailOrUsername));
        }
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
                .findById(id)
                .orElseThrow();
    }

    public UserEntity getUserByEmail(String email) {
        return userRepository
                .findByEmail(email)
                .orElse(null);
    }

    public UserEntity getUserByUsername(String username) {
        return userRepository
                .findByUsername(username)
                .orElse(null);
    }

    public UserEntity createNewUser(UserEntity newUser) {
        newUser.setCreatedAt(LocalDate.now());
        return userRepository
                .save(newUser);
    }

    public UserEntity updateUser(UpdateUserRequestDTO userdata, Long userId) {
        UserEntity user = userRepository.findById(userId).orElseThrow();
        user.setUpdatedAt(LocalDate.now());
        user.setUsername(userdata.getUsername());
        user.setEmail(userdata.getEmail());
        if(!userdata.getPassword().isEmpty()){
            user.setPassword(passwordEncoder.encode(userdata.getPassword()));
        }
        return userRepository.save(user);
    }

    public void addSubscription(SubscriptionRequestDTO request) {
        UserEntity user = userRepository.findById(request.getUserId()).orElseThrow();
        TopicEntity topic = topicRepository.findById(request.getTopicId()).orElseThrow();

        user.getSubscriptions().add(topic);
        userRepository.save(user);
    }

    public void removeSubscription(UserEntity user,Long topicId) {

        TopicEntity topic = topicRepository.findById(topicId).orElseThrow();
System.out.println(topic);
        user.getSubscriptions().remove(topic);
        userRepository.save(user);
    }

    public UserResponseDTO mapUserEntityToDTO(UserEntity user){
        return new UserResponseDTO(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getSubscriptions(),
                user.getCreatedAt(),
                user.getUpdatedAt()
        );
    }
}
