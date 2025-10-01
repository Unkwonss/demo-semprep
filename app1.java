// AppDemo.java
// Demo Semgrep (Java) — có vài lỗi dễ thấy, cả security + anti-pattern
import java.sql.*;
import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;
import java.util.Base64;
import java.io.*;

public class AppDemo {
    public static void main(String[] args) {
        // 1) Hardcoded secret (rõ ràng cho newbie thấy)
        String apiKey = "MY_SUPER_SECRET_KEY_123"; // ❌ Hardcoded secret

        // 2) SQL concatenation (SQL Injection demo)
        String userId = "1 OR 1=1";
        String query = "SELECT * FROM users WHERE id = " + userId; // ❌ unsafe concat
        System.out.println("Query -> " + query);

        // 3) Insecure crypto usage (ECB)
        try {
            byte[] key = "0123456789ABCDEF".getBytes(); // 16 bytes
            SecretKeySpec skey = new SecretKeySpec(key, "AES");
            Cipher cipher = Cipher.getInstance("AES/ECB/PKCS5Padding"); // ❌ ECB insecure
            cipher.init(Cipher.ENCRYPT_MODE, skey);
            byte[] enc = cipher.doFinal("sensitive data".getBytes());
            System.out.println("Encrypted (base64): " + Base64.getEncoder().encodeToString(enc));
        } catch (Exception e) {
            e.printStackTrace();
        }

        // 4) Insecure deserialization demo (do NOT feed untrusted bytes in real app)
        try {
            byte[] bytes = new byte[] {0,1,2,3}; // fake data just to compile
            ObjectInputStream ois = new ObjectInputStream(new ByteArrayInputStream(bytes));
            Object obj = ois.readObject(); // ❌ insecure deserialization if bytes came from network
            System.out.println("Deserialized: " + obj);
        } catch (Exception ex) {
            // ignore: we expect exception because bytes are invalid
        }

        // 5) Logging secrets (bad practice)
        System.out.println("Logging apiKey = " + apiKey); // ❌ don't print secrets in real apps
    }
}
