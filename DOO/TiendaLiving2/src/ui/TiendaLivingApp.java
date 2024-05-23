package ui;

import javax.swing.*;
import java.awt.*;
import java.awt.event.*;
import java.sql.*;
import db.DataBaseConnection;

public class TiendaLivingApp extends JFrame{
    private static final long serialVersionUID = 1L;
	 private JPanel panel;
	    private JTextArea textArea;
	    private JButton btnLoadData;

	    public TiendaLivingApp() {
	        setTitle("Tienda Living");
	        setSize(500, 400);
	        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
	        setLocationRelativeTo(null);

	        panel = new JPanel();
	        panel.setLayout(new BorderLayout());

	        textArea = new JTextArea();
	        textArea.setEditable(false);
	        panel.add(new JScrollPane(textArea), BorderLayout.CENTER);

	        btnLoadData = new JButton("Cargar Datos");
	        btnLoadData.addActionListener(new ActionListener() {
	            @Override
	            public void actionPerformed(ActionEvent e) {
	                loadData();
	            }
	        });
	        panel.add(btnLoadData, BorderLayout.SOUTH);

	        add(panel);
	    }

	    private void loadData() {
	        Connection conn = DataBaseConnection.getConnection();
	        if (conn != null) {
	            String query = "SELECT * FROM productos";
	            try {
	                Statement stmt = conn.createStatement();
	                ResultSet rs = stmt.executeQuery(query);

	                StringBuilder sb = new StringBuilder();
	                while (rs.next()) {
	                    sb.append("ID: ").append(rs.getInt("id")).append("\n");
	                    sb.append("Nombre: ").append(rs.getString("nombre")).append("\n");
	                    sb.append("Descripción: ").append(rs.getString("descripcion")).append("\n");
	                    sb.append("Precio: $").append(rs.getBigDecimal("precio")).append("\n");
	                    sb.append("Disponible: ").append(rs.getBoolean("disponible") ? "Sí" : "No").append("\n");
	                    sb.append("Cantidad: ").append(rs.getInt("cantidad")).append("\n");
	                    sb.append("------------------------\n");
	                }

	                textArea.setText(sb.toString());
	                rs.close();
	                stmt.close();
	                conn.close();
	            } catch (SQLException e) {
	                e.printStackTrace();
	            }
	        }
	    }

	    public static void main(String[] args) {
	        EventQueue.invokeLater(new Runnable() {
	            @Override
	            public void run() {
	                TiendaLivingApp app = new TiendaLivingApp();
	                app.setVisible(true);
	            }
	        });
	    }
	}