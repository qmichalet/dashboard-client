import DashboardBox from "@/components/DashboardBox";
import BoxHeader from "@/components/BoxHeader";
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ZAxis,
  Tooltip,
  Line,
  PieChart,
  Pie,
  Cell,
  ScatterChart,
  Scatter
} from "recharts";
import { useGetKpisQuery, useGetProductsQuery } from "@/state/api";
import { useMemo } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import FlexBetween from "@/components/FlexBetween";

const pieData = [
  { name: "Group A", value: 600 },
  { name: "Group B", value: 400 }
];

const Row2 = () => {
  const { palette } = useTheme();
  const { data: operationalData } = useGetKpisQuery();
  const { data: productsData } = useGetProductsQuery();
  const pieColors = [palette.primary[800], palette.primary[300]];

  const operationalExpenses = useMemo(() => {
    return (
      operationalData &&
      operationalData[0].monthlyData.map(
        ({ month, operationalExpenses, nonOperationalExpenses }) => {
          return {
            name: month.substring(0, 3),
            operationalExpenses,
            nonOperationalExpenses
          };
        }
      )
    );
  }, [operationalData]);

  const productExpenseData = useMemo(() => {
    return (
      productsData &&
      productsData.map(({ _id, price, expense }) => {
        return {
          id: _id,
          price,
          expense
        };
      })
    );
  }, [productsData]);

  return (
    <>
      <DashboardBox gridArea="d">
        <BoxHeader
          title="Operational vs Non-Operational Expenses"
          sideText="+4%"
        />
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={operationalExpenses}
            margin={{
              top: 20,
              right: 0,
              left: -10,
              bottom: 55
            }}
          >
            <CartesianGrid vertical={false} stroke={palette.grey[800]} />
            <XAxis
              dataKey="name"
              tickLine={false}
              style={{ fontSize: "10px" }}
            />
            <YAxis
              yAxisId="left"
              orientation="left"
              tickLine={false}
              axisLine={false}
              style={{ fontSize: "10px" }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tickLine={false}
              axisLine={false}
              style={{ fontSize: "10px" }}
            />
            <Tooltip />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="nonOperationalExpenses"
              stroke={palette.tertiary[500]}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="operationalExpenses"
              stroke={palette.primary.main}
            />
          </LineChart>
        </ResponsiveContainer>
      </DashboardBox>
      <DashboardBox gridArea="e">
        <BoxHeader title="Campaings and Targets" sideText="+40%" />
        <FlexBetween height="80%" mt=".25rem" gap="1.5rem" pr="1rem">
          <PieChart
            width={110}
            height={100}
            margin={{
              top: 0,
              right: -10,
              left: 10,
              bottom: 0
            }}
          >
            <Pie
              stroke="none"
              data={pieData}
              innerRadius={18}
              outerRadius={38}
              paddingAngle={2}
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={pieColors[index]} />
              ))}
            </Pie>
          </PieChart>
          <Box ml="-0.7rem" flexBasis="40%" textAlign="center">
            <Typography variant="h5">Target Sales</Typography>
            <Typography m=".3rem" variant="h3" color={palette.primary[300]}>
              83
            </Typography>
            <Typography variant="h6">
              Finance goals of the campaing that is desired
            </Typography>
          </Box>
          <Box flexBasis="40%">
            <Typography variant="h5">Losses in Revenue</Typography>
            <Typography variant="h6">Loses are down 25%</Typography>
            <Typography mt=".4rem" variant="h5">
              Profit Margins
            </Typography>
            <Typography variant="h6">
              Margins are up by 30% from last month
            </Typography>
          </Box>
        </FlexBetween>
      </DashboardBox>
      <DashboardBox gridArea="f">
        <BoxHeader title="Product Prices vs Expenses" sideText="+4%" />
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart
            margin={{
              top: 20,
              right: 25,
              bottom: 40,
              left: 0
            }}
          >
            <CartesianGrid stroke={palette.grey[800]} />
            <XAxis
              type="number"
              dataKey="price"
              name="price"
              axisLine={false}
              tickLine={false}
              style={{ fontSize: "10px" }}
              tickFormatter={(v) => `$${v}`}
            />
            <YAxis
              type="number"
              dataKey="expense"
              name="expense"
              axisLine={false}
              tickLine={false}
              style={{ fontSize: "10px" }}
              tickFormatter={(v) => `$${v}`}
            />
            <ZAxis type="number" range={[20]} />
            <Tooltip formatter={(v) => `$${v}`} />
            <Scatter
              name="Product Expense Ratio"
              data={productExpenseData}
              fill={palette.tertiary[500]}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </DashboardBox>
    </>
  );
};

export default Row2;
