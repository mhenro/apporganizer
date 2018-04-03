package org.mhenro.apporganizer;

import org.springframework.boot.Banner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class AppOrginizer {
    public static void main(String[] args) throws Exception {
        SpringApplication app = new SpringApplication(AppOrginizer.class);
        app.setBannerMode(Banner.Mode.OFF);
        app.run(args);
    }
}
