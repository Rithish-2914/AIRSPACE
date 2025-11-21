import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Delete } from "lucide-react";

export function CalculatorApp() {
  const [display, setDisplay] = useState('0');
  const [previous, setPrevious] = useState<string | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [newNumber, setNewNumber] = useState(true);

  const handleNumber = (num: string) => {
    if (newNumber) {
      setDisplay(num);
      setNewNumber(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const handleOperation = (op: string) => {
    if (previous !== null && !newNumber) {
      calculate();
    } else {
      setPrevious(display);
    }
    setOperation(op);
    setNewNumber(true);
  };

  const calculate = () => {
    if (previous === null || operation === null) return;

    const prev = parseFloat(previous);
    const curr = parseFloat(display);
    let result = 0;

    switch (operation) {
      case '+':
        result = prev + curr;
        break;
      case '-':
        result = prev - curr;
        break;
      case '*':
        result = prev * curr;
        break;
      case '/':
        result = prev / curr;
        break;
      default:
        return;
    }

    setDisplay(result.toString());
    setPrevious(null);
    setOperation(null);
    setNewNumber(true);
  };

  const clear = () => {
    setDisplay('0');
    setPrevious(null);
    setOperation(null);
    setNewNumber(true);
  };

  const handleDecimal = () => {
    if (newNumber) {
      setDisplay('0.');
      setNewNumber(false);
    } else if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const buttons = [
    ['7', '8', '9', '/'],
    ['4', '5', '6', '*'],
    ['1', '2', '3', '-'],
    ['0', '.', '=', '+'],
  ];

  return (
    <div className="flex flex-col gap-4 max-w-md mx-auto">
      {/* Display */}
      <div className="bg-slate-900/60 border-2 border-cyan-400/40 rounded-xl p-6">
        <div className="text-right">
          {previous && operation && (
            <div className="text-sm text-cyan-400/60 font-futuristic mb-1">
              {previous} {operation}
            </div>
          )}
          <div 
            className="text-4xl font-futuristic text-cyan-300 truncate"
            data-testid="calculator-display"
          >
            {display}
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-4 gap-3">
        <Button
          onClick={clear}
          className="col-span-3 h-16 bg-red-600/80 hover:bg-red-700 text-white font-futuristic text-lg"
          data-testid="button-clear"
        >
          CLEAR
        </Button>
        <Button
          onClick={() => setDisplay(display.slice(0, -1) || '0')}
          className="h-16 bg-slate-700/80 hover:bg-slate-600 text-cyan-300"
          data-testid="button-backspace"
        >
          <Delete className="w-5 h-5" />
        </Button>

        {buttons.map((row, i) => (
          row.map((btn) => {
            const isOperation = ['+', '-', '*', '/', '='].includes(btn);
            return (
              <Button
                key={btn}
                onClick={() => {
                  if (btn === '=') calculate();
                  else if (btn === '.') handleDecimal();
                  else if (isOperation) handleOperation(btn);
                  else handleNumber(btn);
                }}
                className={`h-16 font-futuristic text-xl ${
                  isOperation
                    ? 'bg-blue-600/80 hover:bg-blue-700 text-white'
                    : 'bg-slate-700/80 hover:bg-slate-600 text-cyan-300'
                } ${btn === '0' ? 'col-span-1' : ''}`}
                data-testid={`button-${btn}`}
              >
                {btn}
              </Button>
            );
          })
        ))}
      </div>
    </div>
  );
}
