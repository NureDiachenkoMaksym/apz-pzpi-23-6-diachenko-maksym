using System;
using System.Collections.Generic;

namespace NaturalResources.Patterns
{
    public interface IResourceAnalysisStrategy
    {
        string Name { get; }
        AnalysisResult Analyze(ResourceDataset dataset);
    }

    public sealed class ResourceDataset
    {
        public string Territory { get; init; } = string.Empty;
        public string ResourceType { get; init; } = string.Empty;
        public IReadOnlyList<double> Values { get; init; } = Array.Empty<double>();
        public string Unit { get; init; } = string.Empty;
    }

    public sealed class AnalysisResult
    {
        public string Strategy { get; init; } = string.Empty;
        public string Summary { get; init; } = string.Empty;
        public double AverageValue { get; init; }
        public string Recommendation { get; init; } = string.Empty;
    }

    public sealed class ForestAnalysisStrategy : IResourceAnalysisStrategy
    {
        public string Name => "Forest resource analysis";

        public AnalysisResult Analyze(ResourceDataset dataset)
        {
            double average = Average(dataset.Values);
            string recommendation = average < 45
                ? "Потрібно посилити контроль вирубки та запланувати відновлення лісових насаджень."
                : "Стан лісових ресурсів є прийнятним для поточного періоду.";

            return new AnalysisResult
            {
                Strategy = Name,
                AverageValue = average,
                Summary = $"Середній показник лісового покриву для території {dataset.Territory}: {average:F2} {dataset.Unit}.",
                Recommendation = recommendation
            };
        }

        private static double Average(IReadOnlyList<double> values)
        {
            if (values.Count == 0) return 0;
            double sum = 0;
            foreach (double value in values) sum += value;
            return sum / values.Count;
        }
    }

    public sealed class WaterAnalysisStrategy : IResourceAnalysisStrategy
    {
        public string Name => "Water resource analysis";

        public AnalysisResult Analyze(ResourceDataset dataset)
        {
            double average = Average(dataset.Values);
            string recommendation = average > 65
                ? "Потрібний додатковий контроль якості води та перевірка джерел забруднення."
                : "Показники водних ресурсів перебувають у допустимих межах.";

            return new AnalysisResult
            {
                Strategy = Name,
                AverageValue = average,
                Summary = $"Середній індекс забруднення води для території {dataset.Territory}: {average:F2} {dataset.Unit}.",
                Recommendation = recommendation
            };
        }

        private static double Average(IReadOnlyList<double> values)
        {
            if (values.Count == 0) return 0;
            double sum = 0;
            foreach (double value in values) sum += value;
            return sum / values.Count;
        }
    }

    public sealed class SoilAnalysisStrategy : IResourceAnalysisStrategy
    {
        public string Name => "Soil resource analysis";

        public AnalysisResult Analyze(ResourceDataset dataset)
        {
            double average = Average(dataset.Values);
            string recommendation = average > 50
                ? "Виявлено ризик деградації ґрунтів, доцільно провести детальне обстеження."
                : "Критичних ознак деградації ґрунтів не виявлено.";

            return new AnalysisResult
            {
                Strategy = Name,
                AverageValue = average,
                Summary = $"Середній індекс деградації ґрунтів для території {dataset.Territory}: {average:F2} {dataset.Unit}.",
                Recommendation = recommendation
            };
        }

        private static double Average(IReadOnlyList<double> values)
        {
            if (values.Count == 0) return 0;
            double sum = 0;
            foreach (double value in values) sum += value;
            return sum / values.Count;
        }
    }

    public sealed class ResourceAnalyzer
    {
        private IResourceAnalysisStrategy _strategy;

        public ResourceAnalyzer(IResourceAnalysisStrategy strategy)
        {
            _strategy = strategy;
        }

        public void SetStrategy(IResourceAnalysisStrategy strategy)
        {
            _strategy = strategy;
        }

        public AnalysisResult Run(ResourceDataset dataset)
        {
            return _strategy.Analyze(dataset);
        }
    }

    public static class Program
    {
        public static void Main()
        {
            var analyzer = new ResourceAnalyzer(new ForestAnalysisStrategy());
            var forestDataset = new ResourceDataset
            {
                Territory = "Харківська область",
                ResourceType = "forest",
                Values = new[] { 48.5, 46.2, 44.8, 43.9 },
                Unit = "%"
            };

            Print(analyzer.Run(forestDataset));

            analyzer.SetStrategy(new WaterAnalysisStrategy());
            var waterDataset = new ResourceDataset
            {
                Territory = "Харківська область",
                ResourceType = "water",
                Values = new[] { 55.0, 68.0, 62.5, 71.2 },
                Unit = "index"
            };

            Print(analyzer.Run(waterDataset));
        }

        private static void Print(AnalysisResult result)
        {
            Console.WriteLine($"Strategy: {result.Strategy}");
            Console.WriteLine(result.Summary);
            Console.WriteLine(result.Recommendation);
            Console.WriteLine();
        }
    }
}
