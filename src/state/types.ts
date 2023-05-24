export interface ExpensesByCategory {
	salaries: number;
	supplies: number;
	services: number;
}

export interface Month {
	id: string;
	month: string;
	revenue: string;
	expenses: string;
	nonOperationalExpenses: string;
	operationalExpenses: string;
}

export interface Day {
	id: string;
	date: string;
	revenue: string;
	expenses: string;
}

export interface GetKpisReponse {
	id: string;
	_id: string;
	__v: number;
	totalProfit: number;
	totalRevenue: number;
	totalExpenses: number;
	expensesByCategory: ExpensesByCategory;
	monthlyData: Array<Month>;
	dailyData: Array<Day>;
}
