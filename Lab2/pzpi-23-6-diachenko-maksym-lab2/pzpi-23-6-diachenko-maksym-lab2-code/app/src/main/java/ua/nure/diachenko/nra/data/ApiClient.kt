package ua.nure.diachenko.nra.data

import io.ktor.client.HttpClient
import io.ktor.client.call.body
import io.ktor.client.engine.android.Android
import io.ktor.client.plugins.contentnegotiation.ContentNegotiation
import io.ktor.client.request.get
import io.ktor.client.request.post
import io.ktor.client.request.setBody
import io.ktor.http.ContentType
import io.ktor.http.contentType
import io.ktor.serialization.kotlinx.json.json
import kotlinx.serialization.json.Json
import ua.nure.diachenko.nra.model.Indicator
import ua.nure.diachenko.nra.model.MeasurementDraft
import ua.nure.diachenko.nra.model.ResourceType

class ApiClient(
    private val baseUrl: String = "https://api.example.nure.ua"
) {
    private val client = HttpClient(Android) {
        install(ContentNegotiation) {
            json(Json { ignoreUnknownKeys = true })
        }
    }

    suspend fun getResourceTypes(): List<ResourceType> =
        client.get("$baseUrl/api/mobile/resource-types").body()

    suspend fun getIndicators(resourceTypeId: String): List<Indicator> =
        client.get("$baseUrl/api/mobile/indicators?resourceTypeId=$resourceTypeId").body()

    suspend fun syncMeasurement(draft: MeasurementDraft): MeasurementDraft =
        client.post("$baseUrl/api/mobile/measurements") {
            contentType(ContentType.Application.Json)
            setBody(draft)
        }.body()
}
