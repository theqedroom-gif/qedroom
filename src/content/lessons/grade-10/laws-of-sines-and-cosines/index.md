---
title: Laws of Sines and Cosines
description: Extend right-triangle trigonometry to oblique triangles with the Law of Sines and the Law of Cosines.
lead: Right-triangle trigonometry only gets us so far. In this chapter, we learn to solve triangles that have no right angle.
---

In basic trigonometry, we learned how to find the trigonometric ratios of a right triangle.

<figure class="diagram">

![Right triangle ABC with the right angle at C, angle theta at A and angle beta at B](/images/right-triangle.svg)

<figcaption>

Figure 1.1: Right triangle $ABC$

</figcaption>
</figure>

We used these formulas:

<div class="working">

$$
\begin{aligned}
\sin \theta &= \dfrac{\text{opposite}}{\text{hypotenuse}} = \dfrac{a}{c} \\[1em]
\cos \theta &= \dfrac{\text{adjacent}}{\text{hypotenuse}} = \dfrac{b}{c} \\[1em]
\tan \theta &= \dfrac{\text{opposite}}{\text{adjacent}} = \dfrac{a}{b}
\end{aligned}
$$

</div>

We also learned how to work with angles greater than $90^{\circ}$. In this chapter, we extend those lessons to solve oblique triangles. But before we begin, let's find out what an oblique triangle is.

<div class="callout callout--key">

**Oblique triangle:** a triangle that does not contain a $90^{\circ}$ angle.

</div>

In other words, it is not a right triangle. We defined the trigonometric ratios using right triangles, so we can't simply use them on oblique triangles. This is where the Law of Sines and the Law of Cosines come in, and they are the focus of this chapter. We will define both laws, show how they are used and, most importantly, learn when to use each one.

At the end of each section, we will answer part of our chapter problem. By the end of the chapter, we will have solved all of it.

<section class="panel">
<div class="panel__label">Chapter problem</div>

### Kuya Ben's island-hopping tour

Kuya Ben runs an island-hopping tour from Port $P$. Before taking tourists out, he must plan the trip carefully.

**Part A: The viewpoint on Isla Bato.** Isla Bato has a hilltop viewpoint. From his boat, Kuya Ben measures the angle of elevation to the top as $18^{\circ}$. He sails $400 \text{ m}$ straight toward the island and measures again: $30^{\circ}$. How high is the viewpoint above sea level?

**Part B: The lighthouse.** A lighthouse on Isla Parola is $9 \text{ km}$ from the port, on a bearing of $\text{N } 20^{\circ} \text{ E}$. Its light can be seen up to $6 \text{ km}$ away. Kuya Ben's first leg goes from the port on a bearing of $\text{N } 50^{\circ} \text{ E}$ toward Isla Bato, which is $7 \text{ km}$ away. How far from the port does the boat first come within sight of the light? Is the boat still within range when it reaches Isla Bato?

**Part C: The longest leg.** From Isla Bato, the boat goes $5 \text{ km}$ to Isla Puti. The angle between the path from the port and the path to Isla Puti, measured at Isla Bato, is $120^{\circ}$. How far is Isla Puti from the port?

**Part D: The way home.** Isla Puti is to the southeast of Isla Bato. On what bearing should Kuya Ben steer from Isla Bato to Isla Puti? And on what bearing should he steer from Isla Puti to return directly to the port? If the boat travels at $20 \text{ km}/\text{h}$, how long is the whole tour on the water?

</section>
