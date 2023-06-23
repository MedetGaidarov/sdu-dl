package com.sdu.payload.auth.signup;


import lombok.*;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SignUpRequest {

    String username;
    String password;

    String email;

    String firstName ;
    String lastName;
}
