package org.mhenro.apporganizer.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class FirstController {
    @RequestMapping(value = "hello", method = RequestMethod.GET)
    public String hello() {
        return "Hello world!";
    }
}
