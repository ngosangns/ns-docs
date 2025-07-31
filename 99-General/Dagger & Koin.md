---
tags:
  - concise
  - dagger
  - general
  - koin
  - quick-reference
  - vietnamese
---

Dagger:

- Component có thể dùng với application context để quản lý vòng đời của chính nó.
- Module có thể coi là một group của nhiều dependencies => rút gọn khai báo.
- Component dùng để quản lý dependencies nào sẽ được inject cho module nào trong component.
- Cung cấp module cho component là cách để component đó biết làm cách nào để tạo ra dependencies đó.
- Caution: Modules that use a scope annotation can only be used in components that are annotated with the same scope.
- https://developer.android.com/training/dependency-injection/dagger-android

Koin:

- Khi 2 dependencies cùng 1 class nhưng khác generic thì hãy đặt named để phân biệt vì koin có thể inject nhầm