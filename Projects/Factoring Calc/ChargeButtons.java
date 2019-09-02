import javax.swing.JButton;

public class ChargeButtons
{
    static JButton isCon, notCon, chargeSym;
    public ChargeButtons()
    {
        isCon = new JButton("Con");
        BPad.buttons.add(isCon);
        notCon = new JButton("XConX");
        BPad.buttons.add(notCon);
        chargeSym = new JButton("Charge");
        BPad.buttons.add(chargeSym);
    }
}