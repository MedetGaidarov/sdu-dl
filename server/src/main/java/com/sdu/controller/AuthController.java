package com.sdu.controller;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import com.sdu.model.User;
import com.sdu.payload.auth.LoginRequest;
import com.sdu.payload.auth.LoginResponse;
import com.sdu.payload.auth.signup.SignUpRequest;
import com.sdu.payload.auth.signup.SignUpResponse;
import com.sdu.repository.UserRepository;
import io.swagger.models.Response;
import lombok.RequiredArgsConstructor;

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
import java.util.Optional;
import java.util.UUID;


@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {


    private final UserRepository userRepository;


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
            } else {

                return new ResponseEntity<>("Invalid ID token.", HttpStatus.UNAUTHORIZED);
            }
        } catch (GeneralSecurityException | IOException e) {
            // Handle exception
        }
        return ResponseEntity.ok().build();
    }


    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
        // server side respose to find by username and check paswor
        User user = userRepository.findByUsername(loginRequest.getUsername()).orElseThrow(

        );
        LoginResponse loginResponse = LoginResponse.builder().username(loginRequest.getUsername()).build();

        if(user.getPassword().equals(loginRequest.getPassword()))
        {
            String token = UUID.randomUUID().toString();
            loginResponse.setToken(token);
            return ResponseEntity.ok(loginResponse);

        }
        return new ResponseEntity<>(loginResponse,HttpStatus.UNAUTHORIZED);
    }



    @PostMapping("/signup")
    public ResponseEntity<SignUpResponse> registerUser(@RequestBody SignUpRequest signUpRequest)
    {
            Optional<User> user = userRepository.findByUsername(signUpRequest.getUsername());
            if(user.isPresent())
            {
                return ResponseEntity.ok(new SignUpResponse(signUpRequest.getUsername(), "User Already exists!"));
            }

            User newUser = User.builder()
                    .username(signUpRequest.getUsername())
                    .email(signUpRequest.getEmail())
                    .firstName(signUpRequest.getFirstName())
                    .lastName(signUpRequest.getLastName())
                    .password(signUpRequest.getPassword())
                    .build();
            userRepository.save(newUser);
            return ResponseEntity.ok(new SignUpResponse((signUpRequest.getUsername()), "User Successfully created! "));
    }
}
