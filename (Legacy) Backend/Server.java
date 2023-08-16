import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.net.URI;
import java.security.KeyStore;

import javax.net.ssl.KeyManager;
import javax.net.ssl.KeyManagerFactory;
import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLParameters;
import javax.net.ssl.TrustManager;
import javax.net.ssl.TrustManagerFactory;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpServer;
import com.sun.net.httpserver.HttpsConfigurator;
import com.sun.net.httpserver.HttpsParameters;
import com.sun.net.httpserver.HttpsServer;

interface URLHandler {
    String handleRequest(URI url) throws IOException;
}

class ServerHttpHandler implements HttpHandler {
    URLHandler handler;
    ServerHttpHandler(URLHandler handler) {
        this.handler = handler;
    }
    public void handle(final HttpExchange exchange) throws IOException {
        // add CORS headers
        exchange.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
        exchange.getResponseHeaders().add("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
        exchange.getResponseHeaders().add("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        // form return body after being handled by program
        try {
            String ret = handler.handleRequest(exchange.getRequestURI());
            // form the return string and write it on the browser
            exchange.sendResponseHeaders(200, ret.getBytes().length);
            OutputStream os = exchange.getResponseBody();
            os.write(ret.getBytes());
            os.close();
        } catch(Exception e) {
            String response = e.toString();
            exchange.sendResponseHeaders(500, response.getBytes().length);
            OutputStream os = exchange.getResponseBody();
            os.write(response.getBytes());
            os.close();
        }
    }
}

public class Server {
    public static void start(int port, URLHandler handler, String keystorePath, String keystorePassword) throws Exception {
        // Load the keystore
        char[] password = keystorePassword.toCharArray();
        KeyStore ks = KeyStore.getInstance("JKS");
        FileInputStream fis = new FileInputStream(keystorePath);
        ks.load(fis, password);

        // Initialize KeyManagerFactory
        KeyManagerFactory kmf = KeyManagerFactory.getInstance("SunX509");
        kmf.init(ks, password);

        // Initialize TrustManagerFactory
        TrustManagerFactory tmf = TrustManagerFactory.getInstance("SunX509");
        tmf.init(ks);

        // Initialize SSL context
        SSLContext sslContext = SSLContext.getInstance("TLS");
        KeyManager[] keyManagers = kmf.getKeyManagers();
        TrustManager[] trustManagers = tmf.getTrustManagers();
        sslContext.init(keyManagers, trustManagers, null);

        HttpsServer server = HttpsServer.create(new InetSocketAddress(port), 0);

        // Configure HTTPS parameters
        server.setHttpsConfigurator(new HttpsConfigurator(sslContext) {
            public void configure(HttpsParameters params) {
                SSLContext context = getSSLContext();
                SSLParameters sslParameters = context.getDefaultSSLParameters();
                params.setSSLParameters(sslParameters);
                params.setWantClientAuth(false);
            }
        });

        // Create request entrypoint
        server.createContext("/", new ServerHttpHandler(handler));

        // Start the server
        server.start();
        System.out.println("Server Started! Visit https://localhost:" + port + " to visit.");
    }

    public static void main(String[] args) throws Exception {
        int port = 4000; // Change to your desired port
        URLHandler handler = new Handler(); // Replace with your URLHandler implementation
        String keystorePath = "/etc/letsencrypt/live/backend.synccircle.net/keystore.jks"; // Path to your keystore file
        String keystorePassword = "SC>When2Not69Meet"; // Keystore password

        Server.start(port, handler, keystorePath, keystorePassword);
    }
}