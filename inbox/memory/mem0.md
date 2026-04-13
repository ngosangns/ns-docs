# Mem0 - Universal Memory Layer for AI Agents

## Định nghĩa

**Mem0** là universal memory layer cho AI Agents, enhance AI assistants và agents với intelligent memory layer, enabling personalized AI interactions. Đây là một trong những memory system phổ biến nhất với 52.8k stars.

## Key Metrics

- **Stars**: 52.8k
- **Forks**: 5.9k
- **License**: Apache 2.0

## Tính năng chính

### Multi-Level Memory
- **User State**: Persistent user preferences và history
- **Session State**: Current conversation context
- **Agent State**: Agent's knowledge và learning

### Adaptive Personalization
- Tự động học từ interactions
- Context-aware memory retrieval

### Developer-Friendly
- Intuitive API
- Cross-platform SDKs
- Fully managed service option

## Cài đặt

### Python
```bash
pip install mem0ai
```

### Node.js
```bash
npm install mem0ai
```

### CLI
```bash
npm install -g @mem0/cli
# hoặc
pip install mem0-cli
```

## Python API

```python
from mem0 import Memory

# Initialize
memory = Memory()

# Add memory
memory.add(
    messages=[{"role": "user", "content": "I prefer concise responses"}],
    user_id="user123"
)

# Search memories
result = memory.search(
    query="user preferences",
    user_id="user123"
)

# Get all memories
all_memories = memory.get_all(user_id="user123")

# Delete memory
memory.delete(memory_id="xyz")
```

## Configuration

```python
from mem0 import Memory

memory = Memory(
    config={
        "llm": {
            "provider": "openai",
            "model": "gpt-4"
        },
        "vector_store": {
            "provider": "qdrant",
            "config": {"host": "localhost", "port": 6333}
        }
    }
)
```

## Use Cases

### AI Assistants
- Consistent, context-rich conversations
- Personalize responses based on history

### Customer Support
- Recall past tickets
- User history tracking

### Healthcare
- Track patient preferences
- Medical history management

### Productivity & Gaming
- Adaptive workflows
- Personalized experiences

## Tech Stack

| Language | Percentage |
|----------|------------|
| Python | 60.8% |
| TypeScript | 29.2% |
| MDX | 4.8% |
| Jupyter Notebook | 2.9% |
| JavaScript | 1.1% |
| Shell | 0.7% |

## Benchmarks

| Metric | Result |
|--------|--------|
| Accuracy (LOCOMO) | +26% over OpenAI Memory |
| Response Speed | 91% faster than full-context |
| Token Usage | 90% lower than full-context |

## Managed Service

Mem0 cũng có managed service tại **mem0.com** với:
- Fully managed infrastructure
- Advanced analytics
- Enterprise features

## Ưu điểm

| Ưu điểm | Mô tả |
|---------|-------|
| Multi-level memory | User, Session, Agent state |
| High popularity | 52.8k stars, active community |
| Developer-friendly | Intuitive API, SDKs |
| Cross-platform | Python, Node.js, CLI |
| Managed service | Optional cloud hosting |
| Strong benchmarks | +26% accuracy, 90% token reduction |

## Nhược điểm

| Nhược điểm | Mô tả |
|------------|-------|
| External API calls | Cần LLM cho memory operations |
| Vector store required | Cần Qdrant, Weaviate, etc. |
| Cloud dependency | Managed service requires internet |

## Sử dụng khi nào

- **AI Assistants**: Cần personalized conversations
- **Customer Support**: Track user history
- **Multi-session apps**: Persistent context across sessions
- **Production deployment**: Với managed service option
- **Enterprise**: Cần scalable memory solution

---

**Tài liệu tham khảo**: 
- [mem0ai/mem0](https://github.com/mem0ai/mem0)
- [Documentation](https://docs.mem0.ai/)
- [Managed Service](https://mem0.com)