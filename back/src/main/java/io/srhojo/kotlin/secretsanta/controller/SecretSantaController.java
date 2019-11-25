package io.srhojo.kotlin.secretsanta.controller;

import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@Validated
@RestController
public class SecretSantaController {


    @PostMapping("/v1/players")
    public void test(){}
}
