package ua.nure.naturalresources

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Button
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

// Спрощений приклад екрана мобільного застосунку для внесення вимірювання.
class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            MaterialTheme {
                val message = remember { mutableStateOf("Дані ще не синхронізовано") }
                Column(modifier = Modifier.padding(16.dp)) {
                    Text("Програмна система аналізу природних ресурсів")
                    Text("Тип ресурсу: Лісові ресурси")
                    Text("Показник: індекс стану рослинності")
                    Button(onClick = { message.value = "Запис збережено локально та підготовлено до синхронізації" }) {
                        Text("Зберегти вимірювання")
                    }
                    Text(message.value)
                }
            }
        }
    }
}

data class MeasurementDto(
    val resourceType: String,
    val territoryId: Long,
    val period: String,
    val value: Double,
    val source: String
)

interface NaturalResourcesApi {
    suspend fun sendMeasurement(measurement: MeasurementDto): Boolean
}
