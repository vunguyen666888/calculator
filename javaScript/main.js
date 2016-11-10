var OPERATORS = {
  DIVIDE: '/',
  MULTIPLY: '*',
  SUBTRACT: '-',
  PLUS: '+',
  SQRT: 'sqrt',
  POW: 'pow'
};

angular.module('app', [])
.controller('CalculatorController', function ($scope) {

  $scope.clear = function() {
    // First and second holding value
    $scope.num1 = null;
    $scope.num2 = null;

    // Bind to the output display
    $scope.output = '0';

    // Current holding operator
    $scope.operator = '';

    // Previous operator
    $scope.previousOperator = '';

    // Use for evaluate whether to start a new number in the output or concatenate
    $scope.isFirstDigit = true;
  };

  // Calculate the result
  // isCalculateOperation: use for evaluate whether user press '=' button or 'operator' button
  $scope.calculate = function(isCalculateOperation) {
    var operator = $scope.operator;
$scope.test='';$scope.test2='';
    if (isCalculateOperation) //bam dau bang
	{
      if ($scope.operator)//dung khi khac '' 
	  {
        $scope.num2 = Number($scope.output);$scope.test='1';$scope.test2='1';$scope.test3='a';
      } else if ($scope.previousOperator) //done 1 phep toan da bam dau bang roi tinh 1 phep toan roi
	  {
        $scope.num1 = Number($scope.output);
        $scope.operator = $scope.previousOperator; //trong truong hop bam dau bang lien tiep de giu lai phep toan
		$scope.test='2';$scope.test2='2';
      } else //lan dau bam dau bang nhung chua nhap so gi het ma bam dau bang/ cbam so nhung chua bam dau operatior
	  {$scope.test='3';$scope.test2='3';
        $scope.num1 = Number($scope.output);
      }
    } 
	else {$scope.test='4';   //bam may dau cong tru nhan chia
      if ($scope.isFirstDigit) {$scope.test='4.1';
        return;
      }

      if (!$scope.operator) {$scope.test='4.2';
        $scope.num1 = Number($scope.output);
        return;
      } else {$scope.test='4.3';
        $scope.num2 = Number($scope.output);
      }
    }
//start calculate
    if ($scope.operator && $scope.num2 != null) {$scope.test='5';
      switch ($scope.operator) {
        case OPERATORS.PLUS:
          $scope.num1 = $scope.num1 + $scope.num2;
          break;
        case OPERATORS.SUBTRACT:
          $scope.num1 = $scope.num1 - $scope.num2;
          break;
        case OPERATORS.MULTIPLY:
          $scope.num1 = $scope.num1 * $scope.num2;
          break;
        case OPERATORS.DIVIDE:
          $scope.num1 = $scope.num1 / $scope.num2;
          break;
        case OPERATORS.POW:
          $scope.num1 = (Math.pow($scope.num1, $scope.num2));
//		  $scope.num1=Number($scope.num1);
          break;
      }

      $scope.previousOperator = $scope.operator;
      $scope.operator = '';
	  $scope.num1=(Number($scope.num1)).toPrecision(11);
      $scope.output=Number( $scope.num1).toString();
  
    }
  };
//nhap lieu
  $scope.clickNumber = function(num) {
    $scope.isFirstDigit = ($scope.output === '0' || $scope.isFirstDigit);
    if ($scope.isFirstDigit) {
      $scope.output = num.toString();
      $scope.isFirstDigit = false;
    } else {
      $scope.output += num.toString();
    }
  };

  $scope.clickDot = function(num) {
    if ($scope.output.indexOf('.') === -1) //check wheneever have '.' yet/ just 1 time
	{
      $scope.output += '.';
      $scope.isFirstDigit = false;
    }
  };
  
  //start clickNaga
  
$scope.clickNaga = function(num) {
    if($scope.output!=0 && isFinite($scope.output))// avoid 0 and infinity
	{
      $scope.output=-Number($scope.output);// avoid 1.
      $scope.isFirstDigit = false;
	}
  };
  
  
  $scope.clickDivide = function() {
    $scope.calculate(false);
    $scope.operator = OPERATORS.DIVIDE;
    $scope.isFirstDigit = true;
  };

  $scope.clickMultiply = function() {
    $scope.calculate(false);
    $scope.operator = OPERATORS.MULTIPLY;
    $scope.isFirstDigit = true;
  };

  $scope.clickSubtract = function() {
    $scope.calculate(false);
    $scope.operator = OPERATORS.SUBTRACT;
    $scope.isFirstDigit = true;
  };

  $scope.clickPlus = function() {
    $scope.calculate(false);
    $scope.operator = OPERATORS.PLUS;
    $scope.isFirstDigit = true;
  };

  $scope.clickSqrt = function() {
    $scope.output = Number(Math.sqrt($scope.output).toPrecision(11));
    $scope.isFirstDigit = true;
  };

  $scope.clickPow = function() {
    $scope.calculate(false);
    $scope.operator = OPERATORS.POW;
    $scope.isFirstDigit = true;
  };

  $scope.clickCalculate = function() {
    $scope.calculate(true);
    $scope.isFirstDigit = true;
  };

  $scope.clear();
});
