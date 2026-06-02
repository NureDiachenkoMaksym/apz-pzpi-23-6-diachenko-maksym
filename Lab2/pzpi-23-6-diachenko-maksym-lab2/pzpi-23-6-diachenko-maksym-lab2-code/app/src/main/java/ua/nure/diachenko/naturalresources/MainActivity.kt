package ua.nure.diachenko.naturalresources

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.*
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.lifecycle.viewmodel.compose.viewModel
import ua.nure.diachenko.naturalresources.viewmodel.MainViewModel

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent { NaturalResourcesScreen() }
    }
}

@Composable
fun NaturalResourcesScreen(viewModel: MainViewModel = viewModel()) {
    val state by viewModel.state.collectAsState()

    LaunchedEffect(Unit) { viewModel.refresh() }

    MaterialTheme {
        Surface(modifier = Modifier.fillMaxSize()) {
            Column(modifier = Modifier.padding(16.dp)) {
                Text("Аналіз природних ресурсів", style = MaterialTheme.typography.headlineSmall)
                Spacer(Modifier.height(12.dp))

                Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                    Button(onClick = { viewModel.refresh() }) { Text("Синхронізувати") }
                    Button(onClick = { viewModel.createDemoObservation() }) { Text("Додати запис") }
                }

                Spacer(Modifier.height(12.dp))

                state.summary?.let {
                    Card(modifier = Modifier.fillMaxWidth()) {
                        Column(modifier = Modifier.padding(12.dp)) {
                            Text("Кількість спостережень: ${it.totalObservations}")
                            Text("Середній стан лісів: ${it.forestAverage}")
                            Text("Середній стан водних ресурсів: ${it.waterAverage}")
                            Text("Рівень ризику: ${it.riskLevel}")
                        }
                    }
                }

                state.error?.let { Text("Помилка: $it", color = MaterialTheme.colorScheme.error) }

                LazyColumn(modifier = Modifier.fillMaxSize()) {
                    items(state.observations) { item ->
                        ListItem(
                            headlineContent = { Text("${item.territory}: ${item.indicatorName}") },
                            supportingContent = { Text("${item.value} ${item.unit}, ${item.period}") }
                        )
                        Divider()
                    }
                }
            }
        }
    }
}
