package es.cic.curso.ejercicio2;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

        /*
         * @Bean
         * public WebMvcConfigurer corsConfigurer() {
         * return new WebMvcConfigurer() {
         * 
         * @Override
         * public void addCorsMappings(CorsRegistry registry) {
         * // Rutas específicas para expediente
         * registry.addMapping("/expediente/crear")
         * .allowedOrigins("http://localhost:5173")
         * .allowedMethods("POST");
         * 
         * registry.addMapping("/expediente/{id}")
         * .allowedOrigins("http://localhost:5173")
         * .allowedMethods("GET", "PUT", "DELETE");
         * 
         * registry.addMapping("/expediente/listar")
         * .allowedOrigins("http://localhost:5173")
         * .allowedMethods("GET");
         * 
         * registry.addMapping("/expediente/{id}/documentos")
         * .allowedOrigins("http://localhost:5173")
         * .allowedMethods("GET");
         * // Rutas específicas para documento
         * registry.addMapping("/documento/crear")
         * .allowedOrigins("http://localhost:5173")
         * .allowedMethods("POST");
         * 
         * registry.addMapping("/documento/{id}")
         * .allowedOrigins("http://localhost:5173")
         * .allowedMethods("GET", "PUT", "DELETE");
         * 
         * registry.addMapping("/documento")
         * .allowedOrigins("http://localhost:5173")
         * .allowedMethods("GET");
         * }
         * };
         * }
         * 
         * @RequestMapping(value = "/{path:[^\\.]*}")
         * public String forward() {
         * return "forward:/index.html";
         * }
         */
}
