import javax.swing.*;
import java.util.*;
public class Charge implements Calculator
{
    static int charge, time;
    static String connection = "no";
    public static JTextField screen;
    static int lastTemp;

    public Charge()
    {
        charge = 0;
    }
    
    /**
     * Actual method from Calculator's interface method to see if it's connected to the charger.
     * If the String connection is "yes" than it is connected, not connected otherwise
     * @return  true if connected, false otherwise
     */
    public boolean connectedToCharger()
    {
        if(connection.equals("yes"))
        {
            return true;
        }
        return false;
    }
    
    /**
     * Increases or decreasing the calculator's charge based on the time the program has been running.
     */
    public void isCharging()
    {
        charge = 100; //Couldn't get this to work.
        int timeFStart = lastTemp;
        if(connectedToCharger())
        {
            int temp = (int)((double)(System.currentTimeMillis() / 1000 % 60) - timeFStart);
            if((temp - lastTemp) / 15 > 0)
            {
                charge += (temp - lastTemp) / 15;
                lastTemp = temp;
            }
        }
        else
        {
            int temp = (int)((double)(System.currentTimeMillis() / 1000 % 60) - timeFStart);
            if((temp - lastTemp) / 15 >= 1)
            {
                charge -= Math.abs((temp - lastTemp) / 15);
                lastTemp = temp;
            }
        }
    }

    /**
     * Actual method from Calculator's interface method to see if it's on.
     * If the charge isn't 0, then it returns false. Returns true otherwise.
     * @return  true if charge is greater than 0, false otherwise.
     */
    public boolean isOn()
    {
        if(charge > 0)
        {
            return true;
        }

        return false;
    }
}    