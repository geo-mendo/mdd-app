package com.openclassrooms.mddapi.exceptions;

public class UserNotFoundException extends RuntimeException {
    public UserNotFoundException(Long id) {
        super("Could not find this user " + id);
    }
}
