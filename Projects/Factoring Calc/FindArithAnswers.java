import javax.swing.*;
import java.util.*;
import javax.script.*;

public class FindArithAnswers //extends FindAny
{}
/*    String s;
    //double num1;
    //double num2;
    char oper;
    int posOfOp;
    int[][] dP;
    int count = 0;
    ArrayList<String> inParens = new ArrayList<String>();
    public FindArithAnswers(String b)
    {
        //s = jText.getText();
        s = "(" + b + ")";
        for(int i = 0; i < s.length(); i++)
        {
            if(s.charAt(i) == '(')
            {
                count++;
            }
        }

        dP = new int[count][2];
        int numLeft = 0;
        int numRight = 0;

        for(int r = 0; r < s.length(); r++)
        {
            if(s.charAt(r) == '(')
            {
                dP[numLeft][0] = r;
                numLeft++;
            }
        }

        for(int c = 0; c < s.length(); c++)
        {
            int t = s.indexOf(")");
            if(s.charAt(c) == ')')
            {
                dP[numRight][1] = c;
                numRight++;
            }
        }
        /*
        for(int i = 0; i < dP.length; i++)
        {
        for(int j = 0; j < dP[0].length; j++)
        {
        System.out.print(dP[i][j] + " ");
        }
        }
        //
        findAllParenth();
    }

    public boolean isParsable(String input)
    {
        boolean parse = true;

        try
        {
            Double.parseDouble(input);
        }
        catch(NumberFormatException e)
        {
            parse = false;
        }

        return parse;
    }

    int countOfFirstNum; 
    int countOfSecNum;

    public double findAllParenth()
    {
        int counter = 0;
        String holdS = new String(s);
        int[] indexes = new int[count];
        ArrayList<String> holdRest = new ArrayList<String>();
        for(int i = count; i > 0; i--)
        {
            holdRest.add(s);
            String temper = s.substring(dP[i - 1][0]);
            inParens.add(s.substring(dP[i - 1][0], dP[i - 1][0] + temper.indexOf(")") + 1));
            indexes[count - i] = dP[i - 1][0];
            if((inParens.get(counter). > s.indexOf(inParens.get(counter
            s = s.replace(inParens.get(counter), "");

            counter++;
        }

        for(int ble = 0; ble < holdRest.size(); ble++)
        {
            int countDig = 0;
            for(int m = 0; m < holdRest.get(ble).length(); m++)
            {
                if(Character.isDigit(holdRest.get(ble).charAt(m)) || holdRest.get(ble).charAt(m) == '+' ||
                holdRest.get(ble).charAt(m) == '-' || holdRest.get(ble).charAt(m) == '*' || 
                holdRest.get(ble).charAt(m) == '/')
                {
                    countDig++;
                }             
            }
            if(countDig == 0)
            {
                holdRest.remove(ble);
                ble--;
            }
        }

        for(int n = 0; n < inParens.size(); n++)
        {
            int countDig = 0;
            for(int m = 0; m < inParens.get(n).length(); m++)
            {
                if(Character.isDigit(inParens.get(n).charAt(m)) || inParens.get(n).charAt(m) == '+' ||
                inParens.get(n).charAt(m) == '-' || inParens.get(n).charAt(m) == '*' || 
                inParens.get(n).charAt(m) == '/')
                {
                    countDig++;
                }
            }
            if(countDig == 0)
            {
                inParens.remove(n);
                n--;
            }
        }

        for(String jjj : inParens)
        {
            System.out.println(jjj);
        }
        /*for(String jj : holdRest)
        {
            System.out.println(jj);
        }*/
/*
        double value = 0;

        for(int k = 0; k < inParens.size(); k++)
        {
            String s1 = inParens.get(k);
            int numOfOps = 0;
            for(int j = 0; j < inParens.get(k).length(); j++)
            {
                if(s1.charAt(j) == '*' || s1.charAt(j) == '/' || s1.charAt(j) == '-' ||
                s1.charAt(j) == '+')
                {
                    numOfOps++;
                }
            }
            double total = 0;
            for(int l = 1; l <= numOfOps; l++)
            {
                total = findFullOp(findFirstNum(s1), findSecNum(s1));
                s1 = s1.replace(s1.substring(countOfFirstNum, countOfSecNum), "" + total);
            }
            if(k == inParens.size() - 1)
            {
                return value;
            }
            else
            {
            }
        }
        return value;
        //Calculator.onScreen.add("" + total);
    }

    public double findFirstNum(String s1)
    {
        int countOfFirstNum = 0;
        String sFirst = "";
        double temp;
        s1 = s1.replace("(", "");
        s1 = s1.replace(")", "");

        while(isParsable("" + s1.charAt(countOfFirstNum)) && countOfFirstNum < s1.length())
        {
            sFirst += s1.charAt(countOfFirstNum);
            countOfFirstNum++;
        }

        oper = s1.charAt(countOfFirstNum + 1);
        posOfOp = countOfFirstNum + 1;
        temp = Double.parseDouble(sFirst);
        return temp;
    }

    public double findFullOp(double num1, double num2)
    {
        if(oper == '+')
        {
            return ArithOps.add(num1, num2);
        }
        else if(oper == '-')
        {
            return ArithOps.subtract(num1, num2);
        }
        else if(oper == '*')
        {
            return ArithOps.multiply(num1, num2);
        }
        else
        {
            return ArithOps.divide(num1, num2);
        }
    }

    public double findSecNum(String s1)
    {
        int countOfSecNum= posOfOp + 1;
        String sSec = "";
        double temp1;

        while(isParsable("" + s1.charAt(countOfSecNum)) && countOfSecNum < s1.length())
        {
            sSec += s1.charAt(countOfSecNum);
            countOfSecNum++;
        }

        temp1 = Double.parseDouble(sSec);
        return temp1;
    }

    /*private static final int LEFT_ASSOC = 0;
    private static final int RIGHT_ASSOC = 1;
    private static final Map<String, int[]> OPERATORS = new HashMap<String, int[]>();

    private static final ScriptEngine engine = new ScriptEngineManager().getEngineByName("JavaScript");

    public FindArithAnswers(String m)
    {
    String[] input = m.split("");
    String[] output = expToRPN(input);
    for(String s : output)
    {
    System.out.println(s);
    //Charge.screen.setText(Charge.screen.getText() + s);
    }
    //Calculator.onScreen.add(Charge.screen.getText());

    }

    public static String eval(String matlab_expression){
    if(matlab_expression == null)
    {
    return "NULL";
    }
    String js_parsable_expression = matlab_expression.replaceAll("\\((\\-?\\d+)\\)\\^(\\-?\\d+)", "(Math.pow($1, $2))")
    .replaceAll("(\\d+)\\)\\^(\\-?\\d+)", "(Math.pow($1, $2))");
    try{
    return engine.eval(js_parsable_expression).toString();
    }catch(javax.script.ScriptException e1){
    return null;
    }
    }
    static {
    OPERATORS.put("-", new int[] {0, LEFT_ASSOC});
    OPERATORS.put("+", new int[] {0, LEFT_ASSOC});
    OPERATORS.put("*", new int[] {5, LEFT_ASSOC});
    OPERATORS.put("/", new int[] {5, LEFT_ASSOC});
    OPERATORS.put("_", new int[] {5, RIGHT_ASSOC});
    }

    public static boolean isOperator(String token)
    {
    return OPERATORS.containsKey(token);
    }

    public static final int cmpPrecedence(String token1, String token2)
    {
    if(!isOperator(token1))
    {
    throw new IllegalArgumentException("Invalid tokens: " + token1 + " " + token2);
    }
    return OPERATORS.get(token1)[0]-OPERATORS.get(token2)[0];
    }

    public static boolean isAssociative(String token, int type)
    {
    if(!isOperator(token))
    {
    throw new IllegalArgumentException("Invalid token: " + token);
    }

    if(OPERATORS.get(token)[1] == type)
    {
    return true;
    }
    return false;
    }

    public static String[] unaryToexp(String[] inputTokens)
    {
    ArrayList<String> out = new ArrayList<String>();
    Stack<String> stack = new Stack<String>();
    for(String token : inputTokens)
    {
    if((token == "-") && (isOperator(stack.peek()) || stack.empty()))
    token = "_";
    else if(token == "-"){
    token = "-";
    }
    out.add(token);
    while(!stack.empty())
    {
    out.add(stack.pop());
    }
    }
    String[] output = new String[out.size()];
    return out.toArray(output);
    }

    public static String[] expToRPN(String[] inputTokens)
    {
    ArrayList<String> out = new ArrayList<String>();
    Stack<String> stack = new Stack<String>();

    for(String token : inputTokens)
    {
    if(isOperator(token))
    {
    while(!stack.empty() && isOperator(stack.peek()))
    {
    if((isAssociative(token, LEFT_ASSOC)         && 
    cmpPrecedence(token, stack.peek()) <= 0) ||
    (isAssociative(token, RIGHT_ASSOC)        && 
    cmpPrecedence(token, stack.peek()) < 0))
    {
    out.add(stack.pop());
    continue;
    }
    break;
    }
    stack.push(token);
    }
    else if(token.equals("(")){
    stack.push(token);
    }
    else if(token.equals(")")){
    while(!stack.empty() && !stack.peek().equals("("))
    {
    out.add(stack.pop());
    }
    stack.pop();
    }
    else
    {
    out.add(token);
    }
    }
    while(!stack.empty())
    {
    out.add(stack.pop());
    }
    String[] output = new String[out.size()];
    return out.toArray(output);
    }

    public static double RPNtoDouble(String[] tokens)
    {
    Stack<String> stack = new Stack<String>();

    for(String token : tokens)
    {
    if(!isOperator(token))
    {
    stack.push(token);
    }
    else
    {
    Double d2 = Double.valueOf(stack.pop());
    Double d1 = Double.valueOf(stack.pop());

    Double result = token.compareTo("_") == 0 ? d2 * -1 :
    token.compareTo("*") == 0 ? d1 * d2 :
    token.compareTo("/") == 0 ? d1 / d2 :
    token.compareTo("+") == 0 ? d1 + d2 :
    d1 - d2;

    stack.push(String.valueOf(result));
    }
    }
    return Double.valueOf(stack.pop());
    }*/
//}