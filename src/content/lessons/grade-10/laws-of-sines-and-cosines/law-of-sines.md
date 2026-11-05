---
title: The Law of Sines
description: Learn the Law of Sines, why it works and when to use it to solve oblique triangles, with a worked example.

lead: If you know a side and the angle opposite it, the Law of Sines helps you find the rest of the triangle.
---

## What the law says

We name each side of a triangle after the angle opposite it, so side $a$ is opposite angle $A$.

<figure class="diagram">

![Acute triangle ABC with side a opposite angle A, side b opposite angle B and side c opposite angle C](/images/acute-triangle.svg)

<figcaption>

Figure 1.2: Acute triangle $ABC$

</figcaption>
</figure>

<div class="callout callout--key">

**Key idea:** in any triangle, each side divided by the sine of its opposite angle gives the same value.

$$
\dfrac{a}{\sin A} = \dfrac{b}{\sin B} = \dfrac{c}{\sin C}
$$

</div>

## Why it works

Draw the height $h$ from $C$ straight down to side $c$. This splits the triangle into two right triangles, so we can use the sine ratio in each one.

<div class="working">

$$
\begin{aligned}
\sin A = \dfrac{h}{b} \quad &\text{so} \quad h = b \sin A \\[0.9em]
\sin B = \dfrac{h}{a} \quad &\text{so} \quad h = a \sin B
\end{aligned}
$$

</div>

Both expressions equal the same height, so $b \sin A = a \sin B$. Dividing both sides by $\sin A \sin B$ gives us:

$$
\dfrac{a}{\sin A} = \dfrac{b}{\sin B}
$$

Drawing the height from a different vertex brings in $\dfrac{c}{\sin C}$ the same way. The law also works for obtuse triangles.

## When to use it

Use the Law of Sines when you can form a matching pair: a side and the angle opposite it.

- **Two angles and a side.** If the known side isn't opposite a known angle, find the third angle first. The angles of a triangle add up to $180^{\circ}$.
- **Two sides and an angle opposite one of them.** This case can have two answers, which we'll explore in the next lesson.

<div class="callout callout--mistake">

**Common mistake:** pairing a side with an angle next to it. Always check that the side and the angle are opposite each other.

</div>

## Worked example

In triangle $ABC$, $A = 40^{\circ}$, $B = 60^{\circ}$ and $a = 10$. Find $b$, rounded to two decimal places.

<div class="working">

$$
\begin{aligned}
\dfrac{b}{\sin B} &= \dfrac{a}{\sin A} \\[0.9em]
\dfrac{b}{\sin 60^{\circ}} &= \dfrac{10}{\sin 40^{\circ}} \\[0.9em]
b &= \dfrac{10 \sin 60^{\circ}}{\sin 40^{\circ}}
\end{aligned}
$$

<div class="answer-highlight">

$b \approx 13.47$

</div>
</div>

<div class="callout callout--hint">

**Hint:** make sure your calculator is in degree mode before you press $\sin$.

</div>

## Your turn

In triangle $ABC$, $A = 35^{\circ}$, $B = 75^{\circ}$ and $a = 12$. Find $b$, rounded to two decimal places.

<details>
<summary>Show solution</summary>

<div class="working">

$$
\begin{aligned}
\dfrac{b}{\sin 75^{\circ}} &= \dfrac{12}{\sin 35^{\circ}} \\[0.9em]
b &= \dfrac{12 \sin 75^{\circ}}{\sin 35^{\circ}}
\end{aligned}
$$

<div class="answer-highlight">

$b \approx 20.21$

</div>
</div>
</details>

## Back to the chapter problem

<section class="panel">
<div class="panel__label">Chapter problem</div>
<div class="steps" role="img" aria-label="Part A of 4, in progress"><span class="now">A</span><span>B</span><span>C</span><span>D</span></div>

**Part A: The viewpoint on Isla Bato.** With the Law of Sines, we can now find the height of the viewpoint. Kuya Ben measured $18^{\circ}$ from point $X$, then sailed $400 \text{ m}$ to point $Y$ and measured $30^{\circ}$. Let $T$ be the top of the viewpoint.

<figure class="diagram">

![Side view of the boat at points X and Y, 400 metres apart, with the hilltop T above sea level. The angle of elevation is 18 degrees at X and 30 degrees at Y.](/images/viewpoint-part-a.svg)

<figcaption>

Figure 1.3: The two sightings of the viewpoint

</figcaption>
</figure>

<details>
<summary>Show solution</summary>

<div class="working">

First, find the angles of triangle $XYT$. The angle at $Y$ is $180^{\circ} - 30^{\circ} = 150^{\circ}$, so the angle at $T$ is $180^{\circ} - 18^{\circ} - 150^{\circ} = 12^{\circ}$.

Now the side $400 \text{ m}$ and the angle $12^{\circ}$ form a matching pair, so we can find $YT$.

$$
\begin{aligned}
\dfrac{YT}{\sin 18^{\circ}} &= \dfrac{400}{\sin 12^{\circ}} \\[0.9em]
YT &= \dfrac{400 \sin 18^{\circ}}{\sin 12^{\circ}} \\[0.9em]
YT &\approx 594.5 \text{ m}
\end{aligned}
$$

The height $h$ is one side of a right triangle with hypotenuse $YT$.

$$
\begin{aligned}
h &= YT \sin 30^{\circ} \\
h &\approx 594.5 \times 0.5 \\
h &\approx 297.3 \text{ m}
\end{aligned}
$$

<div class="answer-highlight">

The viewpoint is about $297 \text{ m}$ above sea level.

</div>
</div>
</details>

<p class="next-part">Next: Part B, the lighthouse. Why does the Law of Sines give two answers?</p>

</section>
