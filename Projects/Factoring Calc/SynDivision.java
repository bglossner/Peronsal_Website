import java.util.ArrayList;
import java.util.*;
import javax.swing.*;

public class SynDivision
{
    ArrayList<Integer> nums = new ArrayList<Integer>();
    ArrayList<Integer> synAnswers = new ArrayList<Integer>();
    int answer = 999999;
    ArrayList<String> makeList = new ArrayList<String>();
    ArrayList<Integer> degrees = new ArrayList<Integer>();
    int possAns = 0;
    String s;
    public SynDivision(JTextField jText)
    {
        s = jText.getText();
        s = s.replace(" ", "");
        makeMakeList(s);
        for(String s1 : makeList)
        {
            nums.add(Integer.parseInt(s1));
        }
        possAns = nums.get(nums.size() -1);
        doIt();
    }

    public SynDivision(String str)
    {
        s = str;
        makeMakeList(s);
        for(String s1 : makeList)
        {
            nums.add(Integer.parseInt(s1));
        }
        possAns = nums.get(nums.size() -1);
        doIt();
    }
    
    /**
     * Makes the list of integers needed to go through synthetic division. Takes a string (x^4-4) and adds to makeList ([1,0,0,0,-4]).
     * @param str   String given that needs to be used in order to make makeList.
     */
    public void makeMakeList(String str)
    {
        s = s.replace(" ", "");
        int countList = 0;
        if(s.charAt(0) == 'x')
        {
            makeList.add("1");
        }
        else if(s.charAt(0) == '-' && s.charAt(1) == 'x')
        {
            makeList.add("-1");
        }

        makeList.add("");

        for(int i = 0; i < s.length(); i++)
        {
            if(i == 0 && makeList.get(0).length() == 0)
            {
                if(s.charAt(i) == '-')
                {
                    makeList.set(0, "" + s.charAt(i));
                    i++;
                    while(isParsable(s.substring(i, i + 1)))
                    {
                        makeList.set(0, makeList.get(0) + Integer.parseInt(s.charAt(i) + ""));
                        i++;
                    }
                }
                else
                {
                    while(isParsable(s.substring(i, i + 1)))
                    {
                        makeList.set(0, makeList.get(0) + Integer.parseInt(s.charAt(i) + ""));
                        i++;
                    }
                }
                makeList.add("");
            }

            if(!(isParsable(s.substring(i, i+1))) && i > 0)
            {
                char ch = s.charAt(i);
                if(s.charAt(i) == 'x' && i > 0 && isParsable(s.charAt(i - 1) + "") == false)
                {
                    makeList.set(countList, "1");
                    makeList.add("");
                    degrees.add(1);
                }
                else if(ch == 'x' && i > 0 && isParsable(s.charAt(i - 1) + "") && s.charAt(i + 1) != '^')
                {
                    degrees.add(1);
                }
                else if(ch == '+' || ch == '-')
                {
                    countList++;
                }
            }
            else if(i > 0 && isParsable(s.substring(i, i+1)) && s.substring(i - 1, i).equals("+"))
            {
                if(i > 0 && s.charAt(i - 1) != '^')
                {
                    while(i < s.length() && isParsable("" + s.charAt(i)))
                    {
                        makeList.set(countList, makeList.get(countList) + 
                            Integer.parseInt("" + s.charAt(i)));
                        i++;
                    }
                    i--;
                    if(i < s.length() - 1)
                    {
                        if(s.charAt(i + 1) == 'x')
                        {
                            makeList.add("");
                        }
                    }
                    continue;
                }
            }
            else if(isParsable(s.substring(i, i+1)) && s.substring(i - 1, i).equals("-"))
            {
                makeList.set(countList, "" + s.charAt(i - 1));
                if(i > 0 && s.charAt(i - 1) != '^')
                {
                    while(i < s.length() && isParsable("" + s.charAt(i)))
                    {
                        makeList.set(countList, makeList.get(countList) + 
                            Integer.parseInt("" + s.charAt(i)));
                        i++;
                    }
                    i--;
                    if(i < s.length() - 1)
                    {
                        if(s.charAt(i + 1) == 'x')
                        {
                            makeList.add("");
                        }
                    }
                    continue;
                }
            }
            else if(i > 0 && s.charAt(i - 1) == '^')
            {
                degrees.add(Integer.parseInt("" + s.charAt(i)));
            }
        }

        if(degrees.size() > 0)
        {
            for(int pp = degrees.get(0) - 1; pp > 0; pp--)
            {
                for(int i = 0; i < degrees.size(); i++)
                {
                    if(degrees.get(i) == pp)
                    {
                        break;
                    }
                    else if(i == degrees.size() - 1)
                    {
                        makeList.add(degrees.get(0) - pp, "0");
                    }
                }
            }
        }
    }

    /**
     * Tests to see the inputted String is a number.
     * @return  True if the input is a number, false otherwise.
     */
    public boolean isParsable(String input)
    {
        boolean parse = true;

        try
        {
            Integer.parseInt(input);
        }
        catch(NumberFormatException e)
        {
            parse = false;
        }

        return parse;
    }

    /**
     * Tests if the parameter is an index of the ArrayList degrees.
     * @return  True if num is an index, false otherwise.
     */
    public boolean isSized(int num)
    {
        try
        {
            degrees.get(num);
        }
        catch(IndexOutOfBoundsException e)
        {
            return false;
        }

        return true;
    }

    public SynDivision(ArrayList<Integer> given)
    {
        nums = given;
        possAns= nums.get(nums.size() -1);
    }

    /**
     * Tries to find an answer and also sets the ArrayList synAnswers to the leftover numbers of 
    synthetic division.
     */
    public void doIt()
    { 
        ArrayList<Integer> tempList = new ArrayList<Integer>();
        tempList = nums;
        int holdAnswers = Math.abs(possAns);
        for(possAns = Math.abs(possAns) * -1; possAns < holdAnswers; possAns++)
        {
            synAnswers.add(tempList.get(0));
            for(int i = 1; i < nums.size(); i++)
            {
                int temp = synAnswers.get(i - 1) * possAns;
                int temp2 = nums.get(i) + temp;
                synAnswers.add(temp2);
                if(temp2 == 0 && i == nums.size() - 1)
                {
                    synAnswers.remove(nums.size() - 1);
                    answer = possAns;
                    return;
                }
            }
            synAnswers.removeAll(synAnswers);
        }
    }
    
    /**
     * Returns the answer as an integer.
     * @return answer to the synthetic division
     */
    public int getAnswer()
    {
        return answer;
    }
    
    /**
     * Returns the answer as a String to make it look factored.
     * @return String to make the answer look like a factored answer.
     */
    public String getAnswerAsString()
    {
        Factor fac = new Factor();
        return ("(x" + " " + fac.sign(answer * -1) + " " + fac.getValue(answer) + ")");
    }

    /**
     * Gets the leftover numbers of synAnswers and uses them to make new function and return it as a String. If there is no answer,
     it returns the original String. 
     * @return String of the leftover numbers or of original function.
     */
    public String printRest()
    {
        Factor fac = new Factor();
        String restAns = "";
        if(synAnswers.size() == 0 && answer == 999999)
        {
            return s;
        }
        if(synAnswers.size() > 2)
        {
            for(int j = 0; j < synAnswers.size(); j++)
            {
                restAns += fac.makeTerm(synAnswers.get(j), degrees.get(0) - j - 1) + "+";
            }
            for(int k = 0; k < restAns.length() - 1; k++)
            {
                if(restAns.charAt(k) == '+' && restAns.charAt(k + 1) == '-')
                {
                    restAns = restAns.replaceFirst("\\+\\-", "-");
                }
                else if(restAns.charAt(k) == '+' && restAns.charAt(k + 1) == '+')
                {
                    restAns = restAns.replaceFirst("\\+\\+", "+");
                }
            }
            restAns = restAns.replaceFirst("\\+", "");
            int lastPlus = restAns.lastIndexOf("\\+");
            restAns = restAns.substring(0, restAns.length() - 1);
            int findXToZero = restAns.indexOf("x^0");
            if(findXToZero > -1)
            {
                restAns = restAns.replace("x^0", "");
            }
            for(int l = 0; l < restAns.length(); l++)
            {
                int findZero = restAns.indexOf("0");
                if(findZero > -1)
                {
                    String sub = restAns.substring(findZero, findZero + 4);
                    restAns = restAns.replace(sub, "");
                }
            }
            return restAns;
        }
        for(int i = 1; i < synAnswers.size(); i++)
        {
            String ans = "";
            if(synAnswers.size() == 2 && synAnswers.get(0) == 1){
                 ans += (fac.toString(synAnswers.get(i)));}
            else if(synAnswers.size() == 2){
                 ans += (fac.toString(synAnswers.get(i - 1), synAnswers.get(i)));}
            return ans;
        }
        
        return "";
    }
}