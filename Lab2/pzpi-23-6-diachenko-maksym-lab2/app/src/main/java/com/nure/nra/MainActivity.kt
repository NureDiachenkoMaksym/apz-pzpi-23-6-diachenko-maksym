package com.nure.nra

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent { ResourceDashboardScreen() }
    }
}

@Composable
fun ResourceDashboardScreen() {
    var selectedType by remember { mutableStateOf("forest") }
    val records = listOf(
        ResourceRecord("forest", "Харківська область", "2026-Q1", 73.4),
        ResourceRecord("water", "Харківська область", "2026-Q1", 62.1),
        ResourceRecord("land", "Харківська область", "2026-Q1", 81.8)
    ).filter { it.resourceType == selectedType }

    Column(Modifier.padding(16.dp)) {
        Text("Аналіз природних ресурсів", style = MaterialTheme.typography.headlineSmall)
        Spacer(Modifier.height(12.dp))
        Row {
            listOf("forest", "water", "land").forEach { type ->
                Button(onClick = { selectedType = type }, modifier = Modifier.padding(end = 8.dp)) {
                    Text(type)
                }
            }
        }
        Spacer(Modifier.height(12.dp))
        records.forEach { item ->
            Card(Modifier.fillMaxWidth().padding(vertical = 4.dp)) {
                Column(Modifier.padding(12.dp)) {
                    Text("Тип: ${item.resourceType}")
                    Text("Територія: ${item.territory}")
                    Text("Період: ${item.period}")
                    Text("Значення: ${item.value}")
                }
            }
        }
    }
}
