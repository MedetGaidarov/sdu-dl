package com.sdu.controller;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Collections;


@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @PostMapping("/google")
    public ResponseEntity<?> authenticateWithGoogle(@RequestBody String idTokenString) {
        try {
            GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), GsonFactory.getDefaultInstance())
                    .setAudience(Collections.singletonList("your-google-client-id"))
                    .build();


            GoogleIdToken idToken = verifier.verify(idTokenString);

            if (idToken != null) {
                GoogleIdToken.Payload payload = idToken.getPayload();
                // Get profile information from payload
                String userId = payload.getSubject();
                String email = payload.getEmail();
                // Handle user login in your application (create user, generate JWT, etc.)
            } else {
                // Invalid ID token.
                return new ResponseEntity<>("Invalid ID token.", HttpStatus.UNAUTHORIZED);
            }
        } catch (GeneralSecurityException | IOException e) {
            // Handle exception
        }
        return ResponseEntity.ok().build();
    }
}
