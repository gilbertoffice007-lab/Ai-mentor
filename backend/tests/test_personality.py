import pytest

@pytest.mark.asyncio
async def test_get_riasec_questions(client):
    response = await client.get("/api/personality/questions")
    assert response.status_code == 200
    questions = response.json()
    assert len(questions) >= 3
    assert "options" in questions[0]

@pytest.mark.asyncio
async def test_complete_riasec_assessment(client):
    payload = {
        "answers": [
            {"id": 1, "type": "I", "points": 4},
            {"id": 2, "type": "E", "points": 4},
            {"id": 3, "type": "S", "points": 4}
        ]
    }
    response = await client.post("/api/personality/complete", json=payload)
    assert response.status_code == 200
    res_data = response.json()
    assert res_data["success"] is True
    assert "result" in res_data
    assert "scores" in res_data["result"]
