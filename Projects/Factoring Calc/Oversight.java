import java.awt.*;
import javax.swing.*;
import java.util.*;

public class Oversight extends Charge implements Calculator
{
    BPad bp = new BPad();
    JOptionPane firstPane = new JOptionPane();
    static JFrame c = new JFrame("Factoring Calculator");
    public Oversight()
    {
        Thread t = new Thread(new Runnable()
                {
                    public void run()
                    {
                        firstPane.showOptionDialog(null, "Calculator is powering on!", "Oatmeal", JOptionPane.INFORMATION_MESSAGE, 
                            JOptionPane.INFORMATION_MESSAGE, null, new Object[]{}, null);
                    }
                });
        t.start();
        c.getContentPane().setLayout(null);
        
        long startT = System.currentTimeMillis();
        while(time < 2)
        {
            time = (int)((double)(System.currentTimeMillis() - startT) / 1000 % 60);
        }
        firstPane.getRootFrame().dispose();
        working();
        c.setBounds(0, 0, 1200, 750);
        c.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        
        addToFrame();
    }
    
    /**
     * Creates and/or initializes all things inside JFrame
     */
    public void addToFrame()
    {
        Font f1 = new Font("SansSerif", Font.PLAIN, 25);
        screen = new JTextField("");
        screen.setEditable(false);
        screen.setBackground(Color.YELLOW);
        screen.setLocation(0, 0);
        screen.setSize(925, 150);
        screen.setFont(f1);
        c.add(screen);
        
        int where1 = 750;
        int where2 = 275;
        //Number Buttons
        for(int i = 0; i < 10; i++)
        {
            bp.buttons.get(i).setSize(75, 75);
            bp.buttons.get(i).setLocation(where1, where2);
            where1 += 100;
            if(where1 > 950)
            {
                where1 = 750;
                where2 += 100;
            }
            bp.buttons.get(i).setBackground(Color.YELLOW);
            bp.buttons.get(i).setVisible(true);
            c.add(bp.buttons.get(i));
        }
        int where3 = 1085;
        int where4 = 0;
        //Charge Buttons
        for(int i = bp.buttons.size() - 4; i < bp.buttons.size() - 1; i++)
        {
            bp.buttons.get(i).setSize(100, 50);
            bp.buttons.get(i).setLocation(where3, where4);
            where4 += 50;
            bp.buttons.get(i).setVisible(true);
            c.add(bp.buttons.get(i));
        }
        
        //Go Button
        bp.buttons.get(10).setSize(150, 100);
        bp.buttons.get(10).setLocation(875, 575);
        bp.buttons.get(10).setVisible(true);
        c.add(bp.buttons.get(10));
        //Instruction Button
        bp.buttons.get(bp.buttons.size() - 1).setSize(100, 100);
        bp.buttons.get(bp.buttons.size() - 1).setLocation(950, 25);
        bp.buttons.get(bp.buttons.size() - 1).setVisible(true);
        c.add(bp.buttons.get(bp.buttons.size() - 1));
                
        int where5 = 275;
        //Operator Buttons
        for(int i = 11; i < 15; i++)
        {
            bp.buttons.get(i).setSize(75, 75);
            bp.buttons.get(i).setLocation(1075, where5);
            where5 += 100;
            bp.buttons.get(i).setBackground(Color.YELLOW);
            bp.buttons.get(i).setVisible(true);
            c.add(bp.buttons.get(i));
        }
        
        int where6 = 275;
        //Exponent Buttons
        for(int i = 15; i < 18; i++)
        {
            bp.buttons.get(i).setSize(75, 75);
            bp.buttons.get(i).setLocation(625, where6);
            where6 += 100;
            bp.buttons.get(i).setBackground(Color.YELLOW);
            bp.buttons.get(i).setVisible(true);
            c.add(bp.buttons.get(i));
        }
        
        int where7 = 825;
        //Clear and Del Buttons
        for(int i = 18; i < 20; i++)
        {
            bp.buttons.get(i).setSize(100, 75);
            bp.buttons.get(i).setLocation(where7, 175);
            where7 -= 125;
            bp.buttons.get(i).setVisible(true);
            c.add(bp.buttons.get(i));
        }
        
        int where8 = 275;
        int where9 = 25;
        //Function Buttons --- Get Zeroes button function isn't finished
        for(int i = 20; i < bp.buttons.size() - 4; i++)
        {
            bp.buttons.get(i).setSize(100, 75);
            bp.buttons.get(i).setLocation(where9, where8);
            where8 += 100;
            if(where8 > 675)
            {
                where8 = 275;
                where9 += 125;
            }
            bp.buttons.get(i).setBackground(Color.ORANGE);
            bp.buttons.get(i).setVisible(true);
            c.add(bp.buttons.get(i));
        }
        
        c.setVisible(true);
    }

    /**
     * Creates a random charge and then tests if the calculator is on or not and to begin the program. If not on, it returns false and exits the calculator
     * @return  True if isOn() returns true, false otherwise. 
     */
    public boolean working()
    {
        charge = (int)(Math.random() * 100);
        if(isOn())
        {
            JOptionPane.showOptionDialog(null, "Calculator is on!", "Oatmeal", JOptionPane.PLAIN_MESSAGE, JOptionPane.INFORMATION_MESSAGE, null, new String[]{"Begin!"}, "default");
            return true;
        }
        else
        {
            System.exit(0);
            return false;
        }
    }
}
