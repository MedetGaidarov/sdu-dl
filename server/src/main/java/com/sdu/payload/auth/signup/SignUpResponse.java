package com.sdu.payload.auth.signup;


import lombok.*;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class SignUpResponse {
    String username;
    String message;

}
