import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.SwingUtilities;

public class MainWindow {

    public static void main(String[] args) {
        // Swing UI'yi EDT üzerinde başlatmak daha doğru
        SwingUtilities.invokeLater(() -> {
            JFrame frame = new JFrame("Otomoto Arayüzü");

            // Pencere kapatılınca program da bitsin
            frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);

            // Boyut
            frame.setSize(400, 200);

            // Basit bir buton ekleyelim
            JButton button = new JButton("Başlat");
            frame.add(button);

            // Ekranın ortasına konumlandır
            frame.setLocationRelativeTo(null);

            // Göster
            frame.setVisible(true);
        });
    }
}
