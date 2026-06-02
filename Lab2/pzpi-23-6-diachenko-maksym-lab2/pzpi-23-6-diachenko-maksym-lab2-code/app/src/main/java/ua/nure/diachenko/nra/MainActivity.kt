package ua.nure.diachenko.nra

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Button
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            NaturalResourcesMobileApp()
        }
    }
}

@Composable
fun NaturalResourcesMobileApp() {
    MaterialTheme {
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(20.dp)
        ) {
            Text("Natural Resources Analysis", style = MaterialTheme.typography.headlineSmall)
            Text("Мобільний застосунок для перегляду показників та внесення польових даних.")
            Button(onClick = { /* load resource types from backend */ }) {
                Text("Оновити довідники")
            }
            Button(onClick = { /* create local draft */ }) {
                Text("Створити запис показника")
            }
            Button(onClick = { /* synchronize local drafts */ }) {
                Text("Синхронізувати з сервером")
            }
        }
    }
}
