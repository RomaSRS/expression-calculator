function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    
        let compare = (char) => {
        switch (char) {
            case '(':
                return 1;
                break;
            case '+':
                return 2;
                break;
            case '-':
                return 2;
                break;
            case '*':
                return 3;
                break;
            case '/':
                return 3;
                break;
            default:
                return 0;
                break;
        }
    }

    const operators = {
        '+': (x, y) => x + y,
        '-': (x, y) => x - y,
        '*': (x, y) => x * y,
        '/': (x, y) => x / y
    };

    let opz = [];
    let stack = [];
    let stackCount = -1;

    for (let i = 0; i < expr.length; i++) {
        if (expr[i] >= '0' && expr[i] <= '9') {
            let num = [];
            num += expr[i];
            i++;
            while (expr[i] >= '0' && expr[i] <= '9') {
                num += expr[i];
                i++;
            }
            opz.push(num);
            if (expr[i] !== ' ') {
                i--;
            }
        } else if (expr[i] === "(") {
            stack.push(expr[i]);
            stackCount++;
        } else if (expr[i] === ')') {
            while (stack[stackCount] !== '(') {
                if (stackCount === -1) {
                    throw ("ExpressionError: Brackets must be paired")
                }
                opz.push(stack.pop());
                stackCount--;
            }
            stack.pop();
            stackCount--;
        } else if (expr[i] !== ' ') {
            if (stackCount === -1) {
                stack.push(expr[i]);
                stackCount++;
            } else if (compare(stack[stackCount]) < compare(expr[i])) {
                stack.push(expr[i]);
                stackCount++;
            } else if (compare(stack[stackCount]) >= compare(expr[i])) {
                while (compare(stack[stackCount]) >= compare(expr[i]) && stackCount >= 0) {
                    opz.push(stack.pop());
                    stackCount--;
                }
                stack.push(expr[i]);
                stackCount++;
            }
        } else if (expr[0] === ' ') {
            continue;
        }
    }
    while (stackCount >= 0) {
        if (stack[stackCount] === '(') {
            throw ("ExpressionError: Brackets must be paired");
        }
        opz.push(stack.pop());
        stackCount--;
    }
    opz.forEach(sym => {
        if (sym[0] >= '0' && sym[0] <= '9') {
            stack.push(Number(sym));
        } else {
            let one = stack.pop();
            let two = stack.pop();
            if (sym === '/') {
                if (one !== 0) {
                    stack.push(operators[sym](two, one));
                } else {
                    throw ('TypeError: Division by zero.');
                }
            } else {
                stack.push(operators[sym](two, one));
            }
        }
    });
    return stack.pop();
    
}

module.exports = {
    expressionCalculator
}