#define _CRT_SECURE_NO_WARNINGS

#include <stdio.h>
#include <math.h>

#define MAX_ITER 100
#define THRES 0.01
#define PI acos(-1)

int main(void)
{
	const double starting_mean_anomaly = 3.0 * PI / 10.0;
	const double eccentricity = 0.5;

	double eccentric_anomaly;
	double eccentric_anomaly_prev = starting_mean_anomaly;

	int iterations = 1;

	printf("| Iterations | Eccentric anomaly |\n");
	printf("|--:|--:|\n");
	printf("| 0 | %.4f |\n", starting_mean_anomaly);

	eccentric_anomaly = starting_mean_anomaly + eccentricity * sin(eccentric_anomaly_prev);
	printf("| 1 | %.4f |\n", eccentric_anomaly);

	while (fabs(eccentric_anomaly_prev - eccentric_anomaly) > THRES)
	{
		eccentric_anomaly_prev = eccentric_anomaly;
		eccentric_anomaly = starting_mean_anomaly + eccentricity * sin(eccentric_anomaly_prev);
		iterations++;
		printf("| %d | %.4f |\n", iterations, eccentric_anomaly);
	}

	printf("\nE_{%d} = %.4f rad\n", iterations, eccentric_anomaly);
}