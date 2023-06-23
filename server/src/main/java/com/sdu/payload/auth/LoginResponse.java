package com.sdu.payload.auth;


import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class LoginResponse {
    String username;
    Boolean loggedIn;

}
