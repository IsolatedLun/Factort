def convolute(a: list[int], b: list[int]):
    if not (len(a) == len(b)):
        raise Exception('Both arrays must have the same length')

    def x(a: list[int], b: list[int]):
        b.reverse()

        res = 0
        for i in range(0, len(a)):
            res += a[i] * b[i]

        return res

    l, r = 0, 1
    out = []
    while l < len(a):
        res = x(a[l:r], b[l:r])
        out.append(res)

        r += 1
        if r > len(a):
            l += 1

    return out
