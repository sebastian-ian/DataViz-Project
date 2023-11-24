/**********************************
the four inputs of the ui are used to pick a metric for the x and the y axis. The boxes on the left are for the x axis and  the right ones are for the y axis.

When bottom number is 1 the metrics associated with the top values are:
  8: (math score average) 9: (reading score average) 10: (avgwriting) 12: (percent above 1500)
  
When the bottom number is 2 the above metrics become:
  1: (the average income per capita of the county the school is in) 2: (countys ranked by income, #1 is highest #58 is lowest.)
example:  2 8  X:Countries ranked by income, Y:average math score
          2 1
***********************************/
let data;
let rowCount;
let pointArray = [];
let usablePoints = [];
let columnX = 8;
let columnY = 9;
let tableNum1 = 1;
let tableNum2 = 1;
let tableLength;
let cTest1 = 0;
let cTest2 = 1;
let slider;
let button;
let highestHeat;
let button1Pressed;
let button2Pressed;
let button3Pressed;
let button4Pressed;
let button5Pressed = false;
let button5Unpressed = false;
let showLines = true;
let pointSize = 3;

function preload()
{
  data = loadTable('SAT Report 2015-2016 - SAT Report 2015-2016.csv.csv', 'csv');
  data2 = loadTable('Income per capita per county california 2019.xlsx - Table 1.csv', 'csv'); 
}

function setup() {
  createCanvas(800, 800);
  rowCount = findNumberOfPoints();
  let yPos = 10;
  
  button = createButton('heat map');
  button.position(10,yPos);
  button.mousePressed(button1Function);
  button.style('width', '120px');
  yPos += 20;
  button2 = createButton('cluster Analysis');
  button2.position(10,yPos);
  button2.mousePressed(button2Function);
  button2.style('width', '120px');
  input5 = createInput('3');
  input5.position(130, yPos);
  input5.style('width', '20px');
  yPos += 20;
  button3 = createButton('linear Regression');
  button3.position(10,yPos);
  button3.mousePressed(button3Function);
  button3.style('width', '120px');
  yPos += 20;
  button4 = createButton('reset');
  button4.position(10,yPos);
  button4.mousePressed(button4Function);
  button4.style('width', '120px');
  input6 = createInput('3');
  input6.position(130, yPos);
  input6.style('width', '20px');
  yPos += 20;
  button5 = createButton('hide UI');
  button5.position(10,yPos);
  button5.mousePressed(button5Function);
  button5.style('width', '120px');
  yPos += 20;
  button6 = createButton('show Lines');
  button6.position(10,yPos);
  button6.mousePressed(button6Function);
  button6.style('width', '120px');
  yPos += 20;
  slider = createSlider(1, 15, 3);
  slider.position(10, yPos);
  slider.style('width', '120px');
  yPos += 20;
  input1 = createInput('8');
  input1.position(10, yPos);
  input1.style('width', '52px');
  input2 = createInput('9');
  input2.position(70, yPos);
  input2.style('width', '52px');
  yPos += 20;
  input3 = createInput('1');
  input3.position(10, yPos);
  input3.style('width', '52px');
  input4 = createInput('1');
  input4.position(70, yPos);
  input4.style('width', '52px');
  
  if(input6.value() > 0) pointSize = input6.value();
 
  background(255);
  graphXY(columnX,columnY, true);
}

function draw() {
  columnX = int(input1.value());
  columnY = int(input2.value());
  tableNum1 = int(input3.value());
  tableNum2 = int(input4.value());
  if(input6.value() > 0) pointSize = input6.value();
  }

function findNumberOfPoints()
{
  let numberOfPoints = 0;
  for(let row = 1; row < data.getRowCount(); row++)
    {
      let addPoint = true;
      for(let column = 6; column <= 12; column++)
        {
          if(int(data.get(row,column)) >=  0); // if the program detects a value other than an integer in any column it will not consider the row to be viable
          else 
          {
            addPoint = false;
          }
        }
      if(addPoint === true)
        {
          numberOfPoints++;
        }
      usablePoints[row-1] = addPoint; // this keeps track of which columns have useful rows of data
    }

  let counter=0;
  for (row = 0; row < data.getRowCount()-1; row++)
    {
      if (usablePoints[row] === true) counter++;
    }
  return numberOfPoints;
}

function findListLength(array)
{
  let stillCounting = true;
  let index = 0;
  while(stillCounting === true)
    {
      if(array[index] >= 0) index++;
      else
        {
          stillCounting = false;
          
        }
    }
  return index;
}

function button1Function() // the button functions call certain functions based on which button was pressed
{
  button1Pressed = true;
  dataDensityGraph(columnX,columnY);
  draw();
}
function button2Function()
{
  button2Pressed = true;
  if(input5.value() > 0) clusterAnalysis(input5.value())
  else clusterAnalysis(5);
  draw();
}

function button3Function()
{
  button3Pressed = true;
  linearRegression(columnX,columnY);
  draw();
}

function button4Function()
{
  columnX = int(input1.value());
  columnY = int(input2.value());
  background(255);
  pointArray = [];
  useablePoints = [];
  if (columnX >= 0 && columnY >= 0) graphXY(columnX,columnY, true);
}

function button5Function()
{
  slider.hide();
  button.hide();
  button2.hide();
  button3.hide();
  button4.hide();
  button5.hide();
  button6.hide();
  input1.hide();
  input2.hide();
  input3.hide();
  input4.hide();
  input5.hide();
  input6.hide();
  if (button5Pressed === false) button5Pressed = true;
  else button5pressed = false;
}

function mousePressed()
{
  if (button5Unpressed === true)
    {
      slider.show();
      button.show();
      button2.show();
      button3.show();
      button4.show();
      button5.show();
      button6.show();
      input1.show();
      input2.show();
      input3.show();
      input4.show();
      input5.show();
      input6.show();
      if (button5Pressed === true) button5Pressed = false;
    }
  button5Unpressed = button5Pressed;
}

function button6Function()
{
  if(showLines === false) showLines = true;
  else showLines = false;
  button4Function();
}


function linearRegression(column1, column2) // uses a statistical method of finding the linear regression
{
  let column1Max = findCMax(column1);
  let column2Max = findCMax(column2);
  let ahat;
  let bhat;
  let xi;
  let yi;
  let xbar = 0;
  let ybar = 0;
  let sigmaNumerator = 0;
  let sigmaDenomenator = 0;
  
  for (row = 0; row < rowCount-1; row++)
    {
      xbar += pointArray[row*2];
      ybar += pointArray[row*2+1];
    }  
  xbar /= rowCount-1;
  ybar /= rowCount-1;
  for(row = 0; row < rowCount-1; row++)
    {
      xi = pointArray[row*2];
      yi = pointArray[row*2+1];
      sigmaNumerator += (xi - xbar)*(yi - ybar);
      sigmaDenomenator += (xi - xbar)*(xi - xbar);
    }
  sigmaNumerator /= rowCount-1;
  sigmaDenomenator /= rowCount-1;
  
  bhat = sigmaNumerator / sigmaDenomenator;
  ahat = ybar - (bhat * xbar);
  
  let heightAtWidth = ahat + (bhat * width);
  
  line(0,ahat,width, heightAtWidth);
  
  let slope = -bhat;
  let yintercept = ((790-ahat)*column2Max)/790
}

function clusterAnalysis(numberOfK)
{
  let k = numberOfK;
  if(k == null) k = 3;
  let pointGroups = [];
  let kArray = [];
  let totalInCluster = [];
  let totalInClusterOld = [];
  let clusterColor = [];
  let changeDetected = true;
  let allGroupsHavePoints = false;
  for(i = 0; i < k; i++)
    {
      let randomPoint = int(random(0,rowCount-2));
      kArray.push(pointArray[randomPoint*2]);
      kArray.push(pointArray[randomPoint*2+1]);
      totalInCluster[i] = 0;
      clusterColor[i*3] = random(0,255);
      clusterColor[i*3+1] = random(0,255);
      clusterColor[i*3+2] = random(0,255);
      //circle(kArray[i*2],kArray[i*2+1],50);
    }
  let X = 0;
  let Y = 0;
  let deltaX;
  let deltaY;
  let distance;
  for (repeat = 0; (changeDetected == true || allGroupsHavePoints == false) && repeat < 1000; repeat++) // will repeat untill a certain number of repeats have been met or if all the points have stoped changing groups when all of them have a point
    {
      for(i = 0; i < k; i++)
        {
          totalInCluster[i] = 0;
        }
      for(let row = 1; row < rowCount; row++) // determines which group each point is closest to
        {
          X = pointArray[(row-1)*2];
          Y = pointArray[(row-1)*2+1]
          let lowDistance = 10000;
          let closestK;

          for(j = 0; j < k; j++)
            {
              let kX = kArray[j*2];
              let kY = kArray[j*2+1];
              deltaX = abs(X-kX);
              deltaY = abs(Y-kY);
              distance = sqrt(deltaX*deltaX+deltaY*deltaY);
              if (lowDistance > distance)
                {
                  lowDistance = distance;
                  closestK = j+1;
                }
            }
          pointGroups[row] = closestK; // makes an array that stores the k group each row/point is closest to           
        }

  
      for(let i = 0; i < rowCount-1; i++)
        {
          kArray[i] = 0;
        }
      
      for(let row = 1; row < rowCount; row++) // sets the new center points for each of the k groups by taking the average of all points in it
        {
          let grouping = pointGroups[row] - 1;
          kArray[grouping*2] += pointArray[(row-1)*2];
          kArray[grouping*2+1] += pointArray[(row-1)*2+1];
          totalInCluster[grouping] += 1;
        }
      
      allGroupsHavePoints = true;
      for(let i = 0; i < k*2; i++)
        {
          if (totalInCluster[floor(i/2)] == 0) // if a k group has no points in it then the center value is set to a random point from the data
            {
              let randomPoint = int(random(0,rowCount-2));
              kArray[floor(i/2)*2] = pointArray[randomPoint*2];
              kArray[floor(i/2)*2+1] = pointArray[randomPoint*2+1];
              totalInCluster[floor(i/2)] = 1;
              allGroupsHavePoints = false;
            }
          else
            {
              if(totalInCluster[floor(i/2)] != 0)
                {
                  kArray[i] = kArray[i] / totalInCluster[floor(i/2)];
                }
              
            }
        }
      if(repeat >= 1)
        {
          changeDetected = false;
          for(let i = 0; i < k; i++) // checks the previous values in the clusters to see if anything has changed
            {
              if(totalInClusterOld[i] !== totalInCluster[i]) changeDetected = true; // if any of the values did change from one repeat to another than it will detect change and repeat at least once more
            }

        }
      totalInClusterOld = totalInCluster;
      totalInCluster = [];
    }
  
  
  for(let row = 1; row < rowCount; row++)
    {
      push();
      noStroke();
      let grouping = pointGroups[(row)]-1;
      fill(clusterColor[grouping*3],clusterColor[grouping*3+1],clusterColor[grouping*3+2]); // uses the random color assigned to each group at the start of the function
      
      
      circle(pointArray[(row-1)*2],pointArray[(row-1)*2+1],pointSize);
      
      pop();
    }
  for(let i = 0; i < k; i++)
    {
      push();
      fill(255,255,255);
      pop();
      
    }
}

function dataDensityGraph(column1,column2)
{
  //if (!pointArray[0]) graphXY(column1,column2,false);  
  let X = 0;
  let Y = 0;
  highestHeat = 0; 
  
  for(let yIndex = 0; yIndex < height; yIndex+=50)
    {
    for(let xIndex = 0; xIndex < width; xIndex+=50)
      {          
        let heatIntensity = 0;
        for(let row = 1; row < rowCount; row++)
          {
            X = pointArray[(row-1)*2];
            Y = pointArray[(row-1)*2+1]
            let deltaX = abs(X-xIndex);
            let deltaY = abs(Y-yIndex);
            let distance = sqrt(deltaX*deltaX+deltaY*deltaY);
            if (distance <= 2) distance = 2;
            
            heatIntensity += 1/distance;
          }
        if(highestHeat < heatIntensity) highestHeat = heatIntensity; // finds the highest "heat" of the scatterplot to allow the other points to scale in relation to it.
      }
    }
  
  let heatMultiplier = (255 * 4)/highestHeat;
  
  for(let yIndex = 0; yIndex < height; yIndex+=5)
    {
    for(let xIndex = 0; xIndex < width; xIndex+=5)
      {          
        let heatIntensity = 0;
        for(let row = 1; row < rowCount; row++)
          {
            X = pointArray[(row-1)*2];
            Y = pointArray[(row-1)*2+1]
            let deltaX = abs(X-xIndex);
            let deltaY = abs(Y-yIndex);
            let distance = sqrt(deltaX*deltaX+deltaY*deltaY);
            if (distance <= 2) distance = 2;
            
            heatIntensity += heatMultiplier/distance; // finds the heatIntensity by adding the distance from each pixel in the image to each point
          }
      push();

      if (heatIntensity < 255*2) fill(0,heatIntensity-255*1.5,heatIntensity/3); // This section gives the resulting image its colors and allows them to smoothly transition to each other
        else if (heatIntensity < 255*2) fill(0,(heatIntensity-255)*2+255/10,(255*1.25-(heatIntensity-255)));
        else if (heatIntensity < 255*3) fill((heatIntensity-255*2),255/2+(heatIntensity-255*2),255-(heatIntensity-255*2)*1);
        else if (heatIntensity < 255*4) fill(255-(heatIntensity-255*3)/100,255-(heatIntensity-255*3),0);
        else fill(255-(heatIntensity-255*4)/4,0,0);
      noStroke();
      rect(xIndex,yIndex,5);
        
      pop();
      }
    }  
}

function graphXY(column1, column2, drawBool)
{
  if (drawBool == null) drawBool = true;
  let X = 0;
  let Y = 0;
  drawBool = true;
  let column1Max = findCMax(column1, tableNum1);
  let column2Max = findCMax(column2, tableNum2);
  let heatIntensity = 0;
  if(showLines === true) drawLines(column1Max, column2Max, slider.value());
    for(let row = 2; row < data.getRowCount(); row++)
      {
        let variableX = 0;
        let variableY = 0;
        if(tableNum1 === 2)
          {
            variableX = data.get(row,5);
            for(i = 0; i < data2.getRowCount(); i++)
              {
                if(data2.get(i,0) == variableX)
                  {
                    variableX = data2.get(i, column1);
                  }
              }
          }
        else variableX = int(data.get(row,column1));
        if(tableNum2 === 2)
          {
            variableY = data.get(row,5);
            for(i = 0; i < data2.getRowCount(); i++)
              {
                if(data2.get(i,0) == variableY)
                  {
                    variableY = data2.get(i, column2);
                  }
              }
          }
        else variableY = int(data.get(row,column2))


        X = variableX/column1Max*(width-10);
        Y = height-variableY/column2Max*(height-10); // sets the y value of each point based on the associated column and resizes it to fit
        
        if(usablePoints[row-1] === true)
          {
            pointArray.push(X);
            pointArray.push(Y);
            
          }

        push();
        noStroke();
        fill(0,35,60);
        if(drawBool === true) circle(X, Y, pointSize); // draws each circle 
        pop();
      }
}

function drawLines(xMax, yMax, numberOfLines)
{
  if(!numberOfLines) numberOfLines = 5;
  let graphWidth = width-10;
  let graphXIncrement = graphWidth / numberOfLines;
  let graphHeight = height-10;
  let graphYIncrement = graphHeight / numberOfLines;
  
  for(i = 0; i <= numberOfLines; i++) //
    {
      push();      
      stroke(100,100,100,30);
      line(graphXIncrement * i, height, graphXIncrement*i, 0);
      line(0,height-graphYIncrement*i,width,height-graphYIncrement*i);
      fill(100,100,100);
      text(round(xMax * i/numberOfLines), graphWidth * i/numberOfLines - 25, height-10);
      text(round(yMax * (numberOfLines-i)/numberOfLines), 5, graphHeight * i/numberOfLines+15);
      pop();
    }
}

function findCMax(column, tableNum) // this for function finds the largest value in a column so that the numbers can scale to fit the screen
{
  if(!tableNum) tableNum = 1;
  let cMax = 0;
  let rowValue = 0;
  let localRowCount = 0;
  if(tableNum == 2) localRowCount = data2.getRowCount();
  else localRowCount = rowCount;
  
  
  for(let row = 2; row < localRowCount; row++) // this for loop cycles through all points and compares it against the current highest
    {
      if(tableNum == 2) rowValue = int(data2.get(row-1,column));
      else rowValue = int(data.get(row,column));
      if(cMax < rowValue)
        {
          cMax = rowValue
        }
    }
  return cMax;
}