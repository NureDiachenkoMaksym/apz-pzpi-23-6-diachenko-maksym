/*
Запити до ШІ для практичного заняття №1:

1. Поясни шаблон проєктування Strategy українською мовою.
2. Наведи приклад використання Strategy у програмній системі аналізу природних ресурсів.
3. Створи приклад коду C#, де різні алгоритми аналізу реалізовані як окремі стратегії.
*/

using System;

public interface IResourceAnalysisStrategy
{
    void Analyze();
}

public class ForestAnalysisStrategy : IResourceAnalysisStrategy
{
    public void Analyze()
    {
        Console.WriteLine("Аналіз лісових ресурсів: оцінювання площі лісів, щільності рослинності та змін покриву.");
    }
}

public class WaterAnalysisStrategy : IResourceAnalysisStrategy
{
    public void Analyze()
    {
        Console.WriteLine("Аналіз водних ресурсів: оцінювання водойм, рівня забруднення та змін водної поверхні.");
    }
}

public class SoilAnalysisStrategy : IResourceAnalysisStrategy
{
    public void Analyze()
    {
        Console.WriteLine("Аналіз ґрунтових ресурсів: оцінювання стану ґрунтів, ерозії та придатності територій.");
    }
}

public class ResourceAnalyzer
{
    private IResourceAnalysisStrategy strategy;

    public ResourceAnalyzer(IResourceAnalysisStrategy strategy)
    {
        this.strategy = strategy;
    }

    public void SetStrategy(IResourceAnalysisStrategy strategy)
    {
        this.strategy = strategy;
    }

    public void RunAnalysis()
    {
        strategy.Analyze();
    }
}

public class Program
{
    public static void Main()
    {
        ResourceAnalyzer analyzer = new ResourceAnalyzer(new ForestAnalysisStrategy());
        analyzer.RunAnalysis();

        analyzer.SetStrategy(new WaterAnalysisStrategy());
        analyzer.RunAnalysis();

        analyzer.SetStrategy(new SoilAnalysisStrategy());
        analyzer.RunAnalysis();
    }
}
