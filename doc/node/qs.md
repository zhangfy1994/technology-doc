### querystring

<div class="bi-table">
  <table>
    <colgroup>
      <col width="289px" />
      <col width="181px" />
      <col width="359px" />
    </colgroup>
    <tbody>
      <tr height="34px">
        <td rowspan="1" colSpan="1">
          <div data-type="p">方法</div>
        </td>
        <td rowspan="1" colSpan="1">
          <div data-type="p">使用场景</div>
        </td>
        <td rowspan="1" colSpan="1">
          <div data-type="p">代码示例</div>
        </td>
      </tr>
      <tr height="34px">
        <td rowspan="1" colSpan="1">
          <div data-type="p">querystring.parse(str[, sep][, eq][, options])</div>
        </td>
        <td rowspan="1" colSpan="1">
          <div data-type="p">参数串解析为对象(参数要是？后面的string, 不能是完整url)</div>
        </td>
        <td rowspan="1" colSpan="1"><pre data-syntax="javascript"><code class="language-javascript">qs.parse(&#x27;a=1&amp;b=2&#x27;)
// { a: &#x27;1&#x27;, b: &#x27;2&#x27; }
</code></pre></td>
      </tr>
      <tr height="34px">
        <td rowspan="1" colSpan="1">
          <div data-type="p">querystring.stringify(obj[, sep][, eq][, options])</div>
        </td>
        <td rowspan="1" colSpan="1">
          <div data-type="p">对象转成参数串</div>
        </td>
        <td rowspan="1" colSpan="1"><pre data-syntax="javascript"><code class="language-javascript">qs.stringify({a: 1, b: 2})
// &#x27;a=1&amp;b=2&#x27;
</code></pre></td>
      </tr>
      <tr height="34px">
        <td rowspan="1" colSpan="1">
          <div data-type="p">querystring.escape(str)</div>
        </td>
        <td rowspan="1" colSpan="1">
          <div data-type="p">对参数进行编码转义</div>
        </td>
        <td rowspan="1" colSpan="1"><pre data-syntax="javascript"><code class="language-javascript">qs.escape(&#x27;qs.escape(&#x27;a=开 心&#x27;)
// a%3D%E5%BC%80%20%E5%BF%83
</code></pre></td>
      </tr>
      <tr height="34px">
        <td rowspan="1" colSpan="1">
          <div data-type="p">querystring.unescape(str)</div>
        </td>
        <td rowspan="1" colSpan="1">
          <div data-type="p">解码，是 escape 的逆向</div>
        </td>
        <td rowspan="1" colSpan="1"><pre data-syntax="javascript"><code class="language-javascript">qs.unescape(&#x27;a%3D%20%E4%B8%8D&#x27;)
// a= 不
</code></pre></td>
      </tr>
    </tbody>
  </table>
</div>
