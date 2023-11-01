package com.openclassrooms.mddapi.exceptions;

public class PostNotFoundException extends RuntimeException {
    public PostNotFoundException(Long id) {
        super("Could not find this post " + id);
    }
}
