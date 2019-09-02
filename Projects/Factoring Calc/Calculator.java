import java.util.ArrayList;

public interface Calculator
{   
    static ArrayList<String> onScreen = new ArrayList<String>();
    
    /**
     * Returns true if connected to charger, false otherwise.
     * @return  true or false based on connection
     */
    boolean connectedToCharger();
    
    /**
     * Returns true if calculator is on, false otherwise
     * @return  true or false whether on or off
     */
    boolean isOn();
    
}